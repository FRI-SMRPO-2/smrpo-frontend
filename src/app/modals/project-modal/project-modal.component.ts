import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';

import { FormErrorStateMatcher } from '../../../utils/form-error-state-matcher';
import { User } from '../../interfaces/user.interface';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-project-modal",
  templateUrl: "./project-modal.component.html",
  styleUrls: ["./project-modal.component.scss"],
})
export class ProjectModalComponent implements OnInit {
  @ViewChild("userInput") userInput: ElementRef;

  roles;

  form: FormGroup;
  search = new FormControl();

  selectedUsers: AbstractControl[] = [];
  filteredUsers: Observable<User[]>;

  errorMatcher = new FormErrorStateMatcher();

  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ProjectModalComponent>,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectService.getProjectRoles().subscribe((data) => {
      this.roles = data;
    });

    this.form = this.formBuilder.group(
      {
        name: ["", Validators.required],
        members: this.formBuilder.array([]),
      },
      {
        validators: this.userValidator,
      }
    );

    this.filteredUsers = this.search.valueChanges.pipe(
      filter((value) => typeof value === "string"),
      debounceTime(500),
      switchMap((value) =>
        value ? this.userService.searchUser(value) : of([])
      ),
      map((users) =>
        users.filter(
          (user) => !this.members.value.some((u) => u.user_id === user.id)
        )
      )
    );
  }

  save() {
    console.log(this.form.invalid, this.form.errors);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.search.markAsTouched();
      return;
    }
    delete this.errorMessage;

    this.projectService
      .createProject(this.generateAddProjectRequest(this.form.value))
      .subscribe(
        (res) => this.dialogRef.close(res),
        (err) => {
          if (err.error.message === "Projekt s tem imenom že obstaja")
            this.name.setErrors({ duplicateName: err.error.message });
          else this.errorMessage = err.error.message;
        }
      );
  }

  remove(i) {
    this.members.removeAt(i);
    this.selectedUsers = [...this.members.controls];
  }

  userSelected(event: MatAutocompleteSelectedEvent) {
    const user: User = event.option.value;
    this.search.patchValue("");

    if (this.members.value.some((u) => u.user_id === user.id)) {
      return;
    }

    this.members.push(
      this.formBuilder.group({
        username: user.username,
        user_id: user.id,
        role_id: this.roles.filter((r) => r.title === "Developer")[0].id,
      })
    );
    this.selectedUsers = [...this.members.controls];
    this.userInput.nativeElement.blur();
  }

  generateAddProjectRequest(data) {
    this.members.controls.forEach((fg: FormGroup) => {
      fg.addControl(
        "role",
        this.formBuilder.control(
          this.roles.filter((r) => r.id === fg.get("role_id").value)[0].title
        )
      );
    });

    return {
      name: data.name,
      user_roles: data.members.map((m) => ({
        user_id: m.user_id,
        role_id: m.role_id,
      })),
    };
  }

  private userValidator(form: FormGroup) {
    return form.get("members").value.length > 1 ? null : { noUsers: true };
  }

  get name() {
    return this.form.get("name");
  }
  get members() {
    return this.form.get("members") as FormArray;
  }
}
