import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RootStore } from '../store/root.store';
import { Story } from '../interfaces/story.interface';
import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

// TODO
@Injectable({
  providedIn: 'root'
})
export class StoryService {
  constructor(private http: HttpClient, private rootStore: RootStore) {}

  getAllStories(projectId: number) {
    return this.http.get<Story[]>(`api/project/${projectId}/story/`);
  }

  addStory(projectId: number, data) {
    return this.http.post<any>(`api/project/${projectId}/story/`,
      data,
      {
        headers: new HttpHeaders({
        'Content-Type':  'application/json'
        })
      }
    ).pipe(catchError((e) => throwError(e)));
  }

}
