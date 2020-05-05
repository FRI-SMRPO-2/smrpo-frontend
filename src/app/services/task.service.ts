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
}
