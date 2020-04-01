import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FormErrorStateMatcher } from '../../../utils/form-error-state-matcher';
import { UserService } from '../../services/user.service';

@Component({
  selector: "app-user-modal",
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.scss"]
})
export class UserModalComponent implements OnInit {
  form: FormGroup;
  emptyFieldsError: boolean;

  errorMatcher = new FormErrorStateMatcher();
  passwordErrorMatcher = new CrossFieldErrorMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserModalComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password1: ["", [Validators.required, Validators.minLength(8)]],
        password2: ["", Validators.required],
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        is_superuser: false
      },
      {
        validators: this.passwordValidators
      }
    );
  }

  passwordValidators(form: FormGroup) {
    const p1 = form.get("password1").value;
    const p2 = form.get("password2").value;
    return p1 !== p2 && p1.length && p2.length
      ? { passwordError: "Gesli se ne ujemata" }
      : null;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userService.addUser(this.form.value).subscribe(
      data => {
        this.dialogRef.close(data);
      },
      err => {
        console.log(err);
        if (err.error.username && err.error.username.length)
          this.username.setErrors({ duplicateName: err.error.username[0] });
        if (err.error.password2 && err.error.password2.length)
          this.form.setErrors({ passwordError: err.error.password2[0] });
        if (err.error.email && err.error.email.length)
          this.email.setErrors({ wrongEmail: err.error.email[0] });
      }
    );
  }

  get username() {
    return this.form.get("username");
  }
  get email() {
    return this.form.get("email");
  }
  get password1() {
    return this.form.get("password1");
  }
  get password2() {
    return this.form.get("password2");
  }
}

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective): boolean {
    return (
      control.touched && (control.invalid || form.hasError("passwordError"))
    );
  }
}
