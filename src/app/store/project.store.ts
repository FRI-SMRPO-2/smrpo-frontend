import { BehaviorSubject } from 'rxjs';

import { Project } from '../interfaces/project.interface';

export class ProjectStore {
  private _activeProject = new BehaviorSubject<Project>(null);
  get activeProject$() {
    return this._activeProject.asObservable();
  }

  setActiveProject(project: Project) {
    this._activeProject.next(project);
  }
}
