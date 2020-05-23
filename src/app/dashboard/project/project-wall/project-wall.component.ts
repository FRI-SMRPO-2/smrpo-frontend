import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Project } from 'src/app/interfaces/project.interface';

import { Sprint } from '../../../interfaces/sprint.interface';
import { ProductBacklog, Story } from '../../../interfaces/story.interface';
import { User } from '../../../interfaces/user.interface';
import { StoryModalComponent } from '../../../modals/story-modal/story-modal.component';
import { SprintService } from '../../../services/sprint.service';
import { StoryService } from '../../../services/story.service';
import { RootStore } from '../../../store/root.store';
import { PostModalComponent } from 'src/app/modals/post-modal/post-modal.component';

@Component({
  selector: "app-project-wall",
  templateUrl: "./project-wall.component.html",
  styleUrls: ["./project-wall.component.scss"],
})
export class ProjectWallComponent implements OnInit, OnDestroy {

  project: Project;
  user: User;

  destroy$ = new Subject<boolean>();

  constructor(
    private rootStore: RootStore,
    private dialog: MatDialog,
    private sprintService: SprintService,
    private storyService: StoryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.rootStore.projectStore.activeProject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((project) => {
        this.project = project;
      });

    this.rootStore.userStore.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  addPost(){
    this.dialog
      .open(PostModalComponent, {
        data: {
          projectId: this.project.id
        }
      })
      .afterClosed()
      .subscribe((updatedProject) => {
        if (updatedProject){
          this.project = updatedProject;
          this.rootStore.projectStore.setActiveProject(updatedProject);
        }
      })
  }

  /* addStory() {
    this.dialog
      .open(StoryModalComponent, {
        data: {
          projectId: this.project.id,
          tests: [],
          editing: false,
          type: "add",
          userRoles: this.isAdmin ? ["Admin"] : this.userRoles,
        },
      })
      .afterClosed()
      .subscribe((newStories) => {
        if (newStories) {
          this.productBacklog = newStories;
          this.rootStore.storyStore.setAllStories(newStories);
        }
      });
  } */
}
