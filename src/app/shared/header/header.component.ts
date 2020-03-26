import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { RootStore } from '../../store/root.store';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() title: string;

  navOpened = true;

  constructor(private router: Router, private rootStore: RootStore) {}

  ngOnInit(): void {}

  toggleNav() {
    this.navOpened = !this.navOpened;
    this.sidenav.toggle();
  }

  logout() {
    this.rootStore.userStore.logout();
    this.router.navigate(["/login"]);
  }
}
