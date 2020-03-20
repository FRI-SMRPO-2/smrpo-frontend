import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { RootStore } from '../store/root.store';

@Injectable()
export class AuthResolver implements Resolve<void> {
  constructor(private rootStore: RootStore, private router: Router) {}

  /**
   * Če je uporabnik prijavljen in dostopa do route /login, ga preusmeri na home
   */
  resolve() {
    if (this.rootStore.userStore.authToken) {
      this.router.navigate(["/"]);
    }
  }
}
