import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, of } from 'rxjs';

import { Project } from '../interfaces/project.interface';
import { Sprint } from '../interfaces/sprint.interface';
import { ProductBacklog } from '../interfaces/story.interface';
import { User } from '../interfaces/user.interface';
import { ProjectService } from '../services/project.service';
import { SprintService } from '../services/sprint.service';
import { StoryService } from '../services/story.service';
import { UserService } from '../services/user.service';
import { RootStore } from '../store/root.store';

@Injectable()
export class ProjectResolver
  implements
    Resolve<{
      project: Project;
      sprints: Sprint[];
      stories: ProductBacklog;
      user: User;
    }> {
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private storyService: StoryService,
    private sprintService: SprintService,
    private rootStore: RootStore
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return forkJoin({
      project: this.projectService.getProjectById(route.params.id),
      sprints: this.sprintService.getAllSprints(route.params.id),
      stories: this.storyService.getAllStories(route.params.id),
      user: this.rootStore.userStore.user.is_superuser
        ? of(null)
        : this.userService.getProjectRole(route.params.id),
    });
    /* this.rootStore.projectStore.setActiveProject() */
  }
}
