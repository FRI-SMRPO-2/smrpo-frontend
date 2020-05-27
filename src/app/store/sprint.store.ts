import { BehaviorSubject } from 'rxjs';

import { Sprint } from '../interfaces/sprint.interface';

export class SprintStore {
  private _allSprints = new BehaviorSubject<Sprint[]>([]);
  private _activeSprint = new BehaviorSubject<Sprint>(null);

  get allSprints$() {
    return this._allSprints.asObservable();
  }

  get activeSprint$() {
    return this._activeSprint.asObservable();
  }

  get activeSprint() {
    return this._activeSprint.value;
  }

  setAllSprints(sprints: Sprint[]) {
    this._allSprints.next(sprints);
  }

  setActiveSprint(sprint: Sprint) {
    this._activeSprint.next(sprint);
  }
}
