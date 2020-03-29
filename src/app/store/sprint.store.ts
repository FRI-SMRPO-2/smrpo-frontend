import { BehaviorSubject } from 'rxjs';
import { Sprint } from '../interfaces/sprint.interface';


export class SprintStore {
  private _allSprints = new BehaviorSubject<Sprint[]>([]);

  get allSprints$() {
    return this._allSprints.asObservable();
  }

  setAllSprints(sprints: Sprint[]) {
    this._allSprints.next(sprints);
  }
}
