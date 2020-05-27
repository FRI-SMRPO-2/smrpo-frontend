import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { UserTasks } from '../interfaces/task.interface';
import { User } from '../interfaces/user.interface';
import { RootStore } from '../store/root.store';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient, private rootStore: RootStore) {}

  getMe() {
    return this.http
      .get<User>("api/user/me/")
      .pipe(tap((user) => this.rootStore.userStore.setUser(user)));
  }

  getUser(userId: number) {
    return this.http.get<User>(`api/user/${userId}`);
  }

  getMyTasks(projectId?: number) {
    return this.http.get<UserTasks>("api/user/me/tasks").pipe(
      map((tasks: UserTasks) => {
        if (projectId) {
          tasks.assigned_tasks = tasks.assigned_tasks.filter(
            (task) => task.project_id === projectId
          );
          tasks.assignee_awaiting_tasks = tasks.assignee_awaiting_tasks.filter(
            (task) => task.project_id === projectId
          );
        }
        return tasks;
      })
    );
  }

  getProjectRole(projectId: number) {
    return this.http.get<User>(`api/project/${projectId}/user/me/`);
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

  updateUser(userId, data) {
    return this.http.put<User>(`api/user/${userId}`, data);
  }

  deleteUser(userId) {
    return this.http.delete<any>(`api/user/${userId}`);
  }
}
