import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RootStore } from '../store/root.store';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private rootStore: RootStore, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.rootStore.userStore.user$.pipe(
      map(user => {
        if (!user.is_superuser) this.router.navigate(["/home"]);
        return user.is_superuser;
      })
    );
  }
}
