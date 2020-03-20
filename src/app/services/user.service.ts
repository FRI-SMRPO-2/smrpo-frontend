import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RootStore } from "../store/root.store";
import { User } from "../interfaces/user.interface";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private rootStore: RootStore) {}

  getMe() {
    return this.http
      .get<User>("user/me")
      .pipe(tap(user => this.rootStore.userStore.setUser(user)));
  }
}
