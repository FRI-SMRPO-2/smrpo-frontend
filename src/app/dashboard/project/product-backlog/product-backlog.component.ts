import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ProductBacklog } from '../../../interfaces/story.interface';
import { User } from '../../../interfaces/user.interface';
import { StoryModalComponent } from '../../../modals/story-modal/story-modal.component';
import { RootStore } from '../../../store/root.store';

@Component({
  selector: "app-product-backlog",
  templateUrl: "./product-backlog.component.html",
  styleUrls: ["./product-backlog.component.scss"],
})
export class ProductBacklogComponent implements OnInit {
  isAdmin: boolean;
  user: User;
  userRole;

  project;
  stories;
  sprints: ProductBacklog;

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
      console.log(this.stories);

      if (data.user) {
        this.user = data.user;
        this.userRole = data.user.role;
      }

      if (this.stories) {
        this.productBacklog = data.stories;
      }
    });
  }

  addStory() {
    console.log(this.project);
    this.dialog
      .open(StoryModalComponent, {
        data: { projectId: this.project.project.id },
      })
      .afterClosed()
      .subscribe((newStories) => {
        if (newStories) {
          this.stories = newStories;
          this.productBacklog = newStories;
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
