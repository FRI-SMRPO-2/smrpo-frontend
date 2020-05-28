import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.interface';

import { Project } from '../../interfaces/project.interface';
import { ProfileSettingsComponent } from '../../modals/profile-settings/profile-settings.component';
import { RootStore } from '../../store/root.store';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() showHome = false;

  navOpened = true;
  isHome;

  activeProject$: Observable<Project>;
  user$: Observable<User>;
  isAdmin$: Observable<boolean>;

  constructor(
    private router: Router,
    private rootStore: RootStore,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activeProject$ = this.rootStore.projectStore.activeProject$;
    this.user$ = this.rootStore.userStore.user$;
    this.isAdmin$ = this.user$.pipe(map((user) => user.is_superuser));

    const url = this.router.url;
    this.isHome =
      this.router.url === "/home" ||
      url.substring(1, url.lastIndexOf("/")) === "admin";
  }

  toggleNav() {
    this.navOpened = !this.navOpened;
    this.sidenav.toggle();
  }

  navToHome() {
    this.router.navigate(["/home"]);
  }

  navToAdmin() {
    this.router.navigate(["/admin"]);
  }

  accountSettings() {
    this.dialog
      .open(ProfileSettingsComponent)
      .afterClosed()
      .subscribe((saved) => {
        if (saved) {
          this.snackBar.open(
            "Nastavitve uporabniškega računa uspešno posodobljene",
            "",
            {
              duration: 3000,
              panelClass: ["snackbar-success"],
            }
          );
        }
      });
  }

  logout() {
    this.rootStore.userStore.logout();
    this.router.navigate(["/login"]);
  }
}
