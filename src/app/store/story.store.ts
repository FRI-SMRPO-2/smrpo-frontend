import { BehaviorSubject } from 'rxjs';

import { ProductBacklog } from '../interfaces/story.interface';

export class StoryStore {
  private _allStories = new BehaviorSubject<ProductBacklog>(null);

  get allStories$() {
    return this._allStories.asObservable();
  }

  setAllStories(stories: ProductBacklog) {
    this._allStories.next(stories);
  }
}
