import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, of } from 'rxjs';

import { Project } from '../interfaces/project.interface';
import { Sprint } from '../interfaces/sprint.interface';
import { Story } from '../interfaces/story.interface';
import { User } from '../interfaces/user.interface';
import { ProjectService } from '../services/project.service';
import { SprintService } from '../services/sprint.service';
import { StoryService } from '../services/story.service';
import { UserService } from '../services/user.service';
import { RootStore } from '../store/root.store';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProjectResolver
  implements
    Resolve<{
      project: Project;
      sprints: Sprint[];
      activeSprint: Sprint;
      stories: Story[];
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
      activeSprint: this.sprintService.getActiveSprint(route.params.id),
      stories: this.storyService.getAllStories(route.params.id),
      user: this.rootStore.userStore.user.is_superuser
        ? of(null)
        : this.userService.getProjectRole(route.params.id),
    });
    /* this.rootStore.projectStore.setActiveProject() */
  }
}
