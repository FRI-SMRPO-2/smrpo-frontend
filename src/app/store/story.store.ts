import { BehaviorSubject } from 'rxjs';
import { Story } from '../interfaces/story.interface';

export class StoryStore {
  private _allStories = new BehaviorSubject<Story[]>([]);

  get allStories$() {
    return this._allStories.asObservable();
  }

  setAllStories(stories: Story[]) {
    this._allStories.next(stories);
  }
}
