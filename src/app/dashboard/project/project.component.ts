import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { ProductBacklog, Story } from 'src/app/interfaces/story.interface';

import { Project } from '../../interfaces/project.interface';
import { UserTasks } from '../../interfaces/task.interface';
import { RootStore } from '../../store/root.store';

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit, OnDestroy {
  isLoaded = false;
  project: Project;

  productBacklog: Story[];

  sprints: Sprint[];
  activeSprint: Sprint;
  stories: ProductBacklog;
  userRoles: string[] = [];
  userTasks: UserTasks;
  isAdmin: boolean;
  projectId: number;

  constructor(private route: ActivatedRoute, private rootStore: RootStore) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.project = data.project.project;
      this.stories = data.project.stories;
      this.sprints = data.project.sprints;
      this.activeSprint = data.project.activeSprint;
      this.userRoles = data.project.user ? data.project.user.role : [];
      this.userTasks = data.project.userTasks;
      this.rootStore.userStore.setProjectRoles(this.userRoles);
    });

    this.rootStore.userStore.user$.subscribe(
      (user) => (this.isAdmin = user.is_superuser)
    );
  }

  ngOnDestroy() {
    this.rootStore.projectStore.setActiveProject(null);
  }
}
