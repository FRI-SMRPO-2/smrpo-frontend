import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Sprint } from '../interfaces/sprint.interface';
import { RootStore } from '../store/root.store';

@Injectable({
  providedIn: "root",
})
export class SprintService {
  constructor(private http: HttpClient, private rootStore: RootStore) {}

  getAllSprints(projectId: number) {
    return this.http.get<Sprint[]>(`api/project/${projectId}/sprint/`);
  }

  getActiveSprint(projectId: number) {
    return this.http
      .get<Sprint>(`api/project/${projectId}/sprint/active`)
      .pipe(catchError((e) => of(undefined)));
  }

  addSprint(projectId: number, data: FormData) {
    return this.http
      .post<any>(`api/project/${projectId}/sprint/`, data)
      .pipe(catchError((e) => throwError(e)));
  }

  addStoriesToActiveSprint(sprintId: number, data) {
    return this.http.put<any>(`api/sprint/${sprintId}/story/`, data);
  }
}
