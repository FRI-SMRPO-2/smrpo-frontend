import { Injectable } from '@angular/core';

import { ProjectStore } from './project.store';
import { UserStore } from './user.store';

@Injectable({
  providedIn: "root"
})
export class RootStore {
  readonly userStore = new UserStore();
  readonly projectStore = new ProjectStore();
}
