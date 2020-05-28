import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProductBacklog } from '../interfaces/story.interface';

@Injectable({
  providedIn: "root",
})
export class StoryService {
  constructor(private http: HttpClient) {}

  getAllStories(projectId: number) {
    return this.http.get<ProductBacklog>(`api/project/${projectId}/story/`);
  }

  addStory(projectId: number, data) {
    return this.http
      .post<any>(`api/project/${projectId}/story/`, data)
      .pipe(catchError((e) => throwError(e)));
  }

  updateStory(projectId: number, storyId: number, data) {
    return this.http
      .put<any>(`api/project/${projectId}/story/${storyId}`, data)
      .pipe(catchError((e) => throwError(e)));
  }

  deleteStory(projectId: number, storyId: number){
    return this.http
    .delete<any>(`api/project/${projectId}/story/${storyId}`)
    .pipe(catchError((e) => throwError(e)));
  }

  acceptStories(projectId: number, data) {
    return this.http
      .put<any>(`api/project/${projectId}/story/realize`, data)
      .pipe(catchError((e) => throwError(e)));
  }

  rejectStories(projectId: number, data) {
    return this.http
      .put<any>(`api/project/${projectId}/story/reject`, data)
      .pipe(catchError((e) => throwError(e)));
  }
}
