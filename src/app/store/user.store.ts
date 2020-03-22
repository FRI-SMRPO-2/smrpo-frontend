import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/user.interface';

export class UserStore {
  private _authToken: string;
  private _user = new BehaviorSubject<User>(null);

  get user$() {
    return this._user.asObservable();
  }
  get user() {
    return this._user.value;
  }

  get authToken() {
    if (!this._authToken) this._authToken = localStorage.getItem("authToken");
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
}
