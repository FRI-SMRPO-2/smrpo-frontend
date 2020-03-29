import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Project } from '../../interfaces/project.interface';
import { RootStore } from '../../store/root.store';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() showHome = false;

  navOpened = true;
  activeProject$: Observable<Project>;
  user$: Observable<User>;

  constructor(private router: Router, private rootStore: RootStore) {}

  ngOnInit(): void {
    this.activeProject$ = this.rootStore.projectStore.activeProject$;
    this.user$ = this.rootStore.userStore.user$;
  }

  toggleNav() {
    this.navOpened = !this.navOpened;
    this.sidenav.toggle();
  }

  logout() {
    this.rootStore.userStore.logout();
    this.router.navigate(['/login']);
  }
}
