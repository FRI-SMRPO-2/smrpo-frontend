import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  isScrumMaster: boolean;
  projectId: number;

  destroy$ = new Subject<boolean>();

  constructor(private route: ActivatedRoute, private rootStore: RootStore) {}

  ngOnInit() {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.project = data.project.project;
      this.stories = data.project.stories;
      this.sprints = data.project.sprints;
      this.activeSprint = data.project.activeSprint;
      this.userRoles = data.project.user ? data.project.user.role : [];
      this.userTasks = data.project.userTasks;
      this.rootStore.userStore.setProjectRoles(this.userRoles);
      this.isScrumMaster = this.userRoles.includes("Scrum Master");
    });

    this.rootStore.userStore.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.isAdmin = user.is_superuser;
      });

    this.rootStore.userStore.userRoles$
      .pipe(takeUntil(this.destroy$))
      .subscribe((roles) => {
        this.isScrumMaster = roles.includes("Scrum Master");
      });

    this.rootStore.userStore.userTasks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((tasks) => {
        this.userTasks = tasks;
      });
  }

  ngOnDestroy() {
    this.rootStore.projectStore.setActiveProject(null);
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
