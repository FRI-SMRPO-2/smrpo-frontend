import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';

import { User } from '../../interfaces/user.interface';

@Component({
  selector: "app-project-modal",
  templateUrl: "./project-modal.component.html",
  styleUrls: ["./project-modal.component.scss"]
})
export class ProjectModalComponent implements OnInit {
  @ViewChild("userInput") userInput: ElementRef;

  form: FormGroup;
  search = new FormControl();

  // Dokler ni apija
  users: User[] = [
    { firstName: "Luka", username: "luka" } as any,
    { firstName: "Klavdija", username: "klavdija" },
    { firstName: "Eva", username: "eva" }
  ];
  filteredUsers: Observable<User[]>;

  selectedUsers: AbstractControl[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      members: this.formBuilder.array([])
    });

    this.filteredUsers = this.search.valueChanges.pipe(
      startWith(""),
      filter(value => typeof value === "string"),
      debounceTime(500),

      //TODO: ko bo api uporabi switchMap
      map(value => this._filter(value))
    );
  }

  save() {
    console.log(this.form.value);
  }

  remove(i) {
    this._members.removeAt(i);
    this.selectedUsers = [...this._members.controls];
  }

  userSelected(event: MatAutocompleteSelectedEvent) {
    const user: User = event.option.value;
    this._members.push(
      this.formBuilder.group({
        username: user.username,
        role: "MEMBER"
      })
    );
    this.selectedUsers = [...this._members.controls];
    this.search.patchValue("");
    this.userInput.nativeElement.blur();
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(user =>
      user.firstName.toLowerCase().includes(filterValue)
    );
  }

  get _members() {
    return this.form.get("members") as FormArray;
  }
}
