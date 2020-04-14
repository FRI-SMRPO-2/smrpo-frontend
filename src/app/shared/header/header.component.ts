import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.interface';

import { Project } from '../../interfaces/project.interface';
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

  constructor(private router: Router, private rootStore: RootStore) {}

  ngOnInit(): void {
    this.activeProject$ = this.rootStore.projectStore.activeProject$;
    this.user$ = this.rootStore.userStore.user$;
    this.isAdmin$ = this.user$.pipe(map((user) => user.is_superuser));

    console.log(this.router.url);
    this.isHome = this.router.url === "/home";
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

  logout() {
    this.rootStore.userStore.logout();
    this.router.navigate(["/login"]);
  }
}
