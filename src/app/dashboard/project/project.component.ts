import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { Story, ProductBacklog } from 'src/app/interfaces/story.interface';

import { Project } from '../../interfaces/project.interface';
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
  userRoles: string[];
  isAdmin: boolean;
  projectId: number;

  sprintBacklog = [{ title: "Zgodba #4", priority: "musthave" }];

  constructor(
    private route: ActivatedRoute,
    private rootStore: RootStore,
  ) {
    this.userRoles = [];
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.project = data.project.project;
      this.rootStore.projectStore.setActiveProject(this.project);

      this.stories = data.project.stories;
      this.rootStore.storyStore.setAllStories(this.stories);

      this.sprints = data.project.sprints;
      this.rootStore.sprintStore.setAllSprints(this.sprints);

      this.activeSprint = data.project.activeSprint;
      this.rootStore.sprintStore.setActiveSprint(this.activeSprint);

      this.rootStore.storyStore.setActiveSprintStories(this.activeSprint ? data.project.activeSprint.stories : [])

      this.userRoles = data.project.user ? data.project.user.role : [];
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
