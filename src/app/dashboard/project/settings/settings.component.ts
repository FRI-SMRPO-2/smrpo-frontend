import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { FormErrorStateMatcher } from '../../../../utils/form-error-state-matcher';
import { Project } from '../../../interfaces/project.interface';
import { User } from '../../../interfaces/user.interface';
import { ProjectService } from '../../../services/project.service';
import { UserService } from '../../../services/user.service';
import { RootStore } from '../../../store/root.store';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  @ViewChild("userInput") userInput: ElementRef;
  columns = ["username", "options"];

  roles;
  project;

  form: FormGroup;
  formChanged: boolean;
  search = new FormControl();

  selectedUsers: AbstractControl[] = [];
  filteredUsersPO: Observable<User[]>;
  filteredUsersSM: Observable<User[]>;
  filteredUsersDev: Observable<User[]>;

  errorMatcher = new FormErrorStateMatcher();
  errorMessage: string;

  destroy$ = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService,
    private rootStore: RootStore,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    /* if (this.data) this.project = this.data.project; */
    this.rootStore.projectStore.activeProject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((project) => {
        this.project = project;
      });

    this.form = this.formBuilder.group(
      {
        name: [(this.project && this.project.name) || "", Validators.required],
        product_owner: [
          (this.project && this.project.product_owner) || "",
          Validators.required,
        ],
        scrum_master: [
          (this.project && this.project.scrum_master) || "",
          Validators.required,
        ],
        developers: this.formBuilder.array(
          (this.project &&
            this.project.developers.map((u) => {
              delete u["role"];
              return u;
            })) ||
            []
        ),
      },
      {
        validators: this.userValidator,
      }
    );

    console.log(this.form.value);

    this.selectedUsers = [...this.developers.controls];

    this.filteredUsersPO = this.searchValueChanges(this.product_owner);
    this.filteredUsersSM = this.searchValueChanges(this.scrum_master);
    this.filteredUsersDev = this.search.valueChanges.pipe(
      filter((value) => typeof value === "string"),
      debounceTime(500),
      switchMap((value) =>
        value ? this.userService.searchUser(value) : of([])
      ),
      map((users) => {
        console.log(users);
        return users.filter(
          (user) => !this.developers.value.some((u) => u.id === user.id)
        );
      })
    );
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(() => {
      if (!this.formChanged) {
        this.formChanged = true;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  searchValueChanges(control: AbstractControl) {
    return control.valueChanges.pipe(
      filter((value) => typeof value === "string"),
      debounceTime(500),
      switchMap((value) =>
        value ? this.userService.searchUser(value) : of([])
      )
    );
  }

  mapValue(value) {
    return value ? value.username : "";
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.search.markAsTouched();
      return;
    }
    this.formChanged = false;
    delete this.errorMessage;

    console.log(this.form.value);

    const request = {
      name: this.name.value,
      product_owner_id: this.product_owner.value.id,
      scrum_master_id: this.scrum_master.value.id,
      developer_ids: this.developers.value.map((d) => d.id),
    };

    this.projectService.updateProject(this.project.id, request).subscribe(
      (res: Project) => {
        this.rootStore.projectStore.setActiveProject(res);
        this.userService.getProjectRole(res.id).subscribe((data) => {
          this.rootStore.userStore.setProjectRoles(data.role);
        });
        this.snackBar.open("Nastavitve projekta uspešno posodobljene", "", {
          duration: 5000,
          panelClass: ["snackbar-success"],
        });
      },
      (err) => {
        console.log(err);
        this.snackBar.open(err.error, "", {
          duration: 5000,
          panelClass: ["snackbar-error"],
        });
        if (err.error === "Projekt s tem imenom že obstaja!")
          this.name.setErrors({ duplicateName: err.error.message });
        else this.errorMessage = err.error.message;
        this.formChanged = true;
      }
    );
  }

  remove(i) {
    this.developers.removeAt(i);
    this.selectedUsers = [...this.developers.controls];
  }

  userSelected(event: MatAutocompleteSelectedEvent) {
    const user: User = event.option.value;
    this.search.patchValue("");

    this.developers.push(this.formBuilder.group(user));
    this.selectedUsers = [...this.developers.controls];
    this.userInput.nativeElement.blur();
  }

  private userValidator(form: FormGroup) {
    return form.get("developers").value.length >= 1 ? null : { noUsers: true };
  }

  get name() {
    return this.form.get("name");
  }
  get product_owner() {
    return this.form.get("product_owner");
  }
  get scrum_master() {
    return this.form.get("scrum_master");
  }
  get developers() {
    return this.form.get("developers") as FormArray;
  }
}
