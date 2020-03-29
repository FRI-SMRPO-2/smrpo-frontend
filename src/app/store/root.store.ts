import { Injectable } from '@angular/core';

import { ProjectStore } from './project.store';
import { UserStore } from './user.store';
import { SprintStore } from './sprint.store';
import { StoryStore } from './story.store';

@Injectable({
  providedIn: 'root'
})
export class RootStore {
  readonly userStore = new UserStore();
  readonly projectStore = new ProjectStore();
  readonly sprintStore = new SprintStore();
  readonly storyStore = new StoryStore();
}
