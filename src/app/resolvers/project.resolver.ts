import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Project } from '../interfaces/project.interface';
import { Sprint } from '../interfaces/sprint.interface';
import { ProductBacklog } from '../interfaces/story.interface';
import { UserTasks } from '../interfaces/task.interface';
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
      activeSprint: Sprint;
      user: User;
      userTasks: UserTasks;
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
      userTasks: this.userService.getMyTasks(),
      user: this.rootStore.userStore.user.is_superuser
        ? of(null)
        : this.userService.getProjectRole(route.params.id),
    }).pipe(
      tap(({ project, sprints, activeSprint, stories, user, userTasks }) => {
        this.rootStore.projectStore.setActiveProject(project);
        this.rootStore.storyStore.setAllStories(stories);
        this.rootStore.sprintStore.setAllSprints(sprints);
        this.rootStore.sprintStore.setActiveSprint(activeSprint);
        this.rootStore.userStore.setUserTasks(userTasks);
        this.rootStore.storyStore.setActiveSprintStories(
          activeSprint ? activeSprint.stories : []
        );
      })
    );
  }
}
