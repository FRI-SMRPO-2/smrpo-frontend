import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ProductBacklog } from '../interfaces/story.interface';
import { RootStore } from '../store/root.store';

// TODO
@Injectable({
  providedIn: "root",
})
export class StoryService {
  constructor(private http: HttpClient, private rootStore: RootStore) {}

  getAllStories(projectId: number) {
    return this.http.get<ProductBacklog>(`api/project/${projectId}/story/`);
  }

  addStory(projectId: number, data) {
    return this.http
      .post<any>(`api/project/${projectId}/story/`, data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError((e) => throwError(e)));
  }

  updateStory(projectId: number, storyId: number, data){
    return this.http
      .put<any>(`api/project/${projectId}/story/${storyId}`, data,  {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError((e) => throwError(e)));
  }
}
