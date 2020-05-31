import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FormErrorStateMatcher } from '../../../utils/form-error-state-matcher';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { RootStore } from '../../store/root.store';

@Component({
  selector: "app-profile-settings",
  templateUrl: "./profile-settings.component.html",
  styleUrls: ["./profile-settings.component.scss"],
})
export class ProfileSettingsComponent implements OnInit {
  form: FormGroup;
  emptyFieldsError: boolean;

  user: User;
  loaded: boolean;
  valueChanged: boolean;

  errorMatcher = new FormErrorStateMatcher();
  passwordErrorMatcher = new CrossFieldErrorMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ProfileSettingsComponent>,
    private rootStore: RootStore
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password1: ["", Validators.minLength(8)],
        password2: ["", Validators.minLength(8)],
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
      },
      {
        validators: this.passwordValidators,
      }
    );

    this.userService.getMe().subscribe((data) => {
      this.user = data;
      this.username.setValue(data.username);
      this.email.setValue(data.email);
      this.first_name.setValue(data.first_name);
      this.last_name.setValue(data.last_name);
      this.loaded = true;
    });

    this.form.valueChanges.subscribe((data) => {
      if (this.loaded && !this.valueChanged) {
        this.valueChanged = true;
      }
    });
  }

  passwordValidators(form: FormGroup) {
    const p1 = form.get("password1").value;
    const p2 = form.get("password2").value;
    if (p1.length && !p2.length)
      return { passwordError: "Obe polji za geslo sta obvezni" };
    return p1 !== p2 && p1.length && p2.length
      ? { passwordError: "Gesli se ne ujemata" }
      : null;
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userService.updateMe(this.form.value).subscribe(
      (data) => {
        this.userService.getMe().subscribe((data) => {
          this.rootStore.userStore.setUser(data);
          this.dialogRef.close(true);
        });
      },
      (err) => {
        console.log(err);
        if (err.error.username && err.error.username.length)
          this.username.setErrors({ duplicateName: err.error.username[0] });
        if (err.error.password2 && err.error.password2.length)
          this.form.setErrors({ passwordError: err.error.password2[0] });
        if (err.error.email && err.error.email.length)
          this.email.setErrors({ wrongEmail: err.error.email[0] });
        if (err.error.new_password2 && err.error.new_password2.length)
          this.password1.setErrors({ onlyNumeric: err.error.new_password2 });
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
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
  get first_name() {
    return this.form.get("first_name");
  }
  get last_name() {
    return this.form.get("last_name");
  }
}

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective): boolean {
    return (
      control.touched && (control.invalid || form.hasError("passwordError"))
    );
  }
}
