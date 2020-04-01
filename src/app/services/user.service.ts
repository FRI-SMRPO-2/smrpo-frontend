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

  getProjectRole(projectId: number) {
    return this.http.get<User>(`api/project/${projectId}/user/me`);
  }

  getAllUsers() {
    return this.http.get<User[]>("api/user");
  }

  searchUser(name: string) {
    return this.http.get<User[]>(`api/user/?search=${name}`);
  }

  addUser(data: User) {
    return this.http.post<User>("api/user/", data);
  }
}
