import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { User } from '../interfaces/user.interface';
import { RootStore } from '../store/root.store';

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private rootStore: RootStore) {}

  getMe() {
    return this.http
      .get<User>("api/user/me")
      .pipe(tap(user => this.rootStore.userStore.setUser(user)));
  }
}
