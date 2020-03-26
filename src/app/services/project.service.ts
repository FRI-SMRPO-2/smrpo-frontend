import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.prod';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: "root"
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAllProjects() {
    return this.http.get<Project[]>(`${environment.apiURL}/api/project`);
  }

  getProjectById(id: number) {
    return this.http.get<Project>(`${environment.apiURL}/api/project/${id}`);
  }
}
