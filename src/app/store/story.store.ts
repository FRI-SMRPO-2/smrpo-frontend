import { BehaviorSubject } from 'rxjs';

import { ProductBacklog, Story } from '../interfaces/story.interface';

export class StoryStore {
  private _allStories = new BehaviorSubject<ProductBacklog>(null);
  private _activeSprintStories = new BehaviorSubject<Story[]>(null);

  get allStories$() {
    return this._allStories.asObservable();
  }

  get activeSprintStories$() {
    return this._activeSprintStories.asObservable();
  }

  setAllStories(stories: ProductBacklog) {
    this._allStories.next(stories);
  }

  setActiveSprintStories(stories: Story[]) {
    this._activeSprintStories.next(stories);
  }
}
