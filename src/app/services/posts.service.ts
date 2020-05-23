import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class PostService {
  constructor(private http: HttpClient) {}

  addPost(projectId: number, data) {
    return this.http
      .post<any>(`api/project/${projectId}/post/`, data)
      .pipe(catchError((e) => throwError(e)));
  }
}
