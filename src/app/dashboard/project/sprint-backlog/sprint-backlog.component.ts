import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { Project } from '../../../interfaces/project.interface';
import { User } from '../../../interfaces/user.interface';
import { SprintModalComponent } from '../../../modals/sprint-modal/sprint-modal.component';
import { RootStore } from '../../../store/root.store';

@Component({
  selector: "app-sprint-backlog",
  templateUrl: "./sprint-backlog.component.html",
  styleUrls: ["./sprint-backlog.component.scss"],
})
export class SprintBacklogComponent implements OnInit {
  isAdmin: boolean;
  user: User;
  userRole;

  project;
  stories;
  sprints;

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
      this.project = data.project;
      this.stories = data.project.stories;
      this.sprints = data.project.sprints;

      if (data.user) {
        this.user = data.user;
        this.userRole = data.user.role;
      }

      if (this.stories) {
        this.productBacklog = data.stories;
      }
    });
  }

  addSprint() {
    this.dialog
      .open(SprintModalComponent, {
        data: { projectId: this.project.project.id },
      })
      .afterClosed()
      .subscribe((newSprints) => {
        if (newSprints) {
          this.sprints = newSprints;
        }
      });
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
