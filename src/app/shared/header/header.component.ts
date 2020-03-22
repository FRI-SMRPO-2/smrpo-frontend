import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RootStore } from '../../store/root.store';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private rootStore: RootStore) {}

  ngOnInit(): void {}

  logout() {
    this.rootStore.userStore.logout();
    this.router.navigate(["/login"]);
  }
}
