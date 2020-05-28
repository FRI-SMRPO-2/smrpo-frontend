import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { WorkSession } from '../interfaces/task.interface';

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

  updateTask(taskId: number, data){
    return this.http
      .put<any>(`api/task/${taskId}/`, data)
      .pipe(catchError((e) => throwError(e)));
  }

  deleteTask(taskId: number){
    return this.http
      .delete<any>(`api/task/${taskId}/`)
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

  getWorkSession(taskId: number, startDate: Date, endDate: Date) {
    /* Date in format YYYY-MM-dd */
    const withLeadingZero = (d) => ("0" + d).slice(-2);

    const start = `${startDate.getFullYear()}-${withLeadingZero(
      startDate.getMonth() + 1
    )}-${withLeadingZero(startDate.getDate())}`;

    const end = `${endDate.getFullYear()}-${withLeadingZero(
      endDate.getMonth() + 1
    )}-${withLeadingZero(endDate.getDate())}`;

    return this.http.get<any>(
      `api/task/${taskId}/work_sessions?end_date=${end}&start_date=${start}`
    );
  }

  editWorkSession(taskId: number, data: WorkSession) {
    return this.http.put<any>(`api/task/${taskId}/work_sessions`, data);
  }
}
