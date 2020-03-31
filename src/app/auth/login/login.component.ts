import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading: boolean;
  errorMessage: string;

  destroy$ = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.errorMessage) this.errorMessage = "";
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onLogin() {
    if (this.form.invalid || this.loading) {
      return;
    }
    this.loading = true;
    this.authService.login(this.form.value).subscribe(
      () => {
        this.router.navigate(["/"]);
      },
      err => {
        this.errorMessage = err.error.non_field_errors[0];
        this.loading = false;
      }
    );
  }

  get username() {
    return this.form.get("username");
  }
  get password() {
    return this.form.get("password");
  }
}
