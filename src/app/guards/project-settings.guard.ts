import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { RootStore } from '../store/root.store';

@Injectable()
export class ProjectSettingsGuard implements CanActivate {
  constructor(
    private rootStore: RootStore,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.rootStore.userStore.user$.pipe(
      switchMap((user) =>
        !user.is_superuser
          ? this.userService.getProjectRole(route.parent.params.id).pipe(
              tap(console.log),
              map((data) => {
                if (!data.role.includes("Scrum Master")) {
                  this.router.navigate(["/home"]);
                  return false;
                }
                return true;
              })
            )
          : of(true)
      )
    );
  }
}
