import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}

  addTask(storyId: number, data) {
    return this.http
      .post<any>(`api/story/${storyId}/task/`, data)
      .pipe(catchError((e) => throwError(e)));
  }

  acceptTask(taskId: number) {
    return this.http.put<any>(`api/task/${taskId}/accept`, null);
  }

  rejectTask(taskId: number) {
    return this.http.put<any>(`api/task/${taskId}/decline`, null);
  }

  finishTask(taskId: number) {
    return this.http.put<any>(`api/task/${taskId}/finish`, null);
  }

  startWorkOnTask(taskId: number) {
    return this.http.put<any>(`api/task/${taskId}/start_work`, null);
  }

  stopWorkOnTask(taskId: number) {
    return this.http.put<any>(`api/task/${taskId}/stop_work`, null);
  }
}
