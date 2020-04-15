import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../../interfaces/project.interface';
import { User } from '../../../interfaces/user.interface';
import { SprintModalComponent } from '../../../modals/sprint-modal/sprint-modal.component';
import { RootStore } from '../../../store/root.store';
import { Story } from 'src/app/interfaces/story.interface';
import { Sprint } from 'src/app/interfaces/sprint.interface';

@Component({
  selector: "app-sprint-backlog",
  templateUrl: "./sprint-backlog.component.html",
  styleUrls: ["./sprint-backlog.component.scss"],
})
export class SprintBacklogComponent implements OnInit {
  isAdmin: boolean;
  user: User;
  userRole;

  project: Project;
  stories: Story[];
  sprints: Sprint[];
  activeSprint: Sprint;

  productBacklog = [];

  constructor(
    private route: ActivatedRoute,
    private rootStore: RootStore,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.rootStore.userStore.user$.subscribe((user) => {
      this.isAdmin = user.is_superuser;
    });

    this.route.parent.data.subscribe((data) => {
      this.project = data.project.project;
      this.sprints = data.project.sprints;
      this.activeSprint = data.project.activeSprint;

      if (data.user) {
        this.user = data.user;
        this.userRole = data.user.role;
      }

      if (this.activeSprint) {
        this.stories = this.activeSprint.stories;
      }
    });
  }

  addSprint() {
    this.dialog
      .open(SprintModalComponent, {
        data: { projectId: this.project.id },
      })
      .afterClosed()
      .subscribe((newSprints) => {
        if (newSprints) {
          this.sprints = newSprints;
        }
      });
  }

  viewSprints() {
    this.dialog
      .open(SprintModalComponent, {
        data: {
          projectId: this.project.id,
          sprints: this.sprints,
          activeSprintId: this.activeSprint === undefined ? 0 : this.activeSprint.id
        },
      });
      // TODO: fix subscribe - trenutno dialog ne vrača nič nazaj
      // TODO: POMEMBNO - trenutno se novi sprinti ne shranijo - vedno dobimo iste vrednosti iz this.route.parent.data
      //.afterClosed()
      /* .subscribe((newStories) => {
        if (newStories) {
          this.stories = newStories;
          this.productBacklog = newStories;
        }
      }); */
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
