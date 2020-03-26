import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Project } from '../../interfaces/project.interface';
import { RootStore } from '../../store/root.store';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() showHome: boolean = false;

  navOpened = true;
  activeProject$: Observable<Project>;

  constructor(private router: Router, private rootStore: RootStore) {}

  ngOnInit(): void {
    this.activeProject$ = this.rootStore.projectStore.activeProject$;
  }

  toggleNav() {
    this.navOpened = !this.navOpened;
    this.sidenav.toggle();
  }

  logout() {
    this.rootStore.userStore.logout();
    this.router.navigate(["/login"]);
  }
}
