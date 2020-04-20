import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAllProjects() {
    return this.http.get<Project[]>("api/project");
  }

  getProjectById(id: number) {
    return this.http.get<Project>(`api/project/${id}`);
  }

  createProject(data) {
    return this.http.post("api/project/", data);
  }
}
