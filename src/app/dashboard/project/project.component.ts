import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { Story } from 'src/app/interfaces/story.interface';
import { SprintModalComponent } from 'src/app/modals/sprint-modal/sprint-modal.component';
import { StoryModalComponent } from 'src/app/modals/story-modal/story-modal.component';

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
  stories: Story[];
  userRole: string;
  isAdmin: boolean;
  projectId: number;

  sprintBacklog = [{ title: "Zgodba #4", priority: "musthave" }];

  sprintModalDialogRef: MatDialogRef<SprintModalComponent>;
  storyModalDialogRef: MatDialogRef<StoryModalComponent>;

  constructor(
    private route: ActivatedRoute,
    private rootStore: RootStore,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.project = data.project.project;
      this.rootStore.projectStore.setActiveProject(this.project);
    });

    this.rootStore.userStore.user$.subscribe(
      (user) => (this.isAdmin = user.is_superuser)
    );
  }

  ngOnDestroy() {
    this.rootStore.projectStore.setActiveProject(null);
  }
}
