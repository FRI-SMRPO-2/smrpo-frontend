import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/user.interface';

export class UserStore {
  private _authToken: string;
  private _user = new BehaviorSubject<User>(null);
  private _userRoles = new BehaviorSubject<string[]>(null);
  private _userTasks = new BehaviorSubject<any>(null);

  get user$() {
    return this._user.asObservable();
  }

  get user() {
    return this._user.value;
  }

  get userRoles$() {
    return this._userRoles.asObservable();
  }

  get userTasks$() {
    return this._userTasks.asObservable();
  }

  get authToken() {
    if (!this._authToken) {
      this._authToken = localStorage.getItem("authToken");
    }
    return this._authToken;
  }

  set authToken(token: string) {
    this._authToken = token;
    localStorage.setItem("authToken", token);
  }

  logout() {
    localStorage.clear();
    delete this._authToken;
  }

  setUser(user: User) {
    this._user.next(user);
  }

  setProjectRoles(roles: string[]) {
    this._userRoles.next(roles);
  }

  setUserTasks(tasks) {
    this._userTasks.next(tasks);
  }
}
