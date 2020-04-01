import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RootStore } from '../store/root.store';
import { Sprint } from '../interfaces/sprint.interface';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  constructor(private http: HttpClient, private rootStore: RootStore) {}

  getAllSprints(projectId: number) {
    return this.http.get<Sprint[]>(`api/project/${projectId}/sprint`);
  }

  addSprint(projectId: number, data: FormData) {
    return this.http.post<any>(`api/project/${projectId}/sprint/`, data);
  }
}