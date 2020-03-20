import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    /**
     * Na začetku, ko pride v app pokliče getMe, da dobi podatke o userju, oz. če ni
     *  prijavljen, ga preusmeri na login
     */
    return this.userService.getMe().pipe(
      map(() => true),
      catchError(() => {
        this.router.navigate(["/login"]);
        return of(false); // of vrne Observable
      })
    );
  }
}
