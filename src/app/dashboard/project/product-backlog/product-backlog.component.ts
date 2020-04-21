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

@Component({
  selector: "app-product-backlog",
  templateUrl: "./product-backlog.component.html",
  styleUrls: ["./product-backlog.component.scss"],
})
export class ProductBacklogComponent implements OnInit, OnDestroy {
  user: User;
  isAdmin: boolean;
  userRoles: string[];

  project: Project;

  activeSprint: Sprint;
  storiesToSprintActive: boolean = false;
  activeStoriesSum = 0;
  activeStories = [];

  productBacklog: ProductBacklog;

  destroy$ = new Subject<boolean>();

  constructor(
    private rootStore: RootStore,
    private dialog: MatDialog,
    private sprintService: SprintService,
    private storyService: StoryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.rootStore.userStore.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.isAdmin = user.is_superuser;
      });

    this.rootStore.projectStore.activeProject$
      .pipe(takeUntil(this.destroy$))
      .subscribe((project) => {
        this.project = project;
      });

    this.rootStore.storyStore.allStories$
      .pipe(takeUntil(this.destroy$))
      .subscribe((stories) => {
        this.productBacklog = stories;
      });

    this.rootStore.userStore.userRoles$
      .pipe(takeUntil(this.destroy$))
      .subscribe((userRoles) => {
        this.userRoles = userRoles ?? [];
      });

    this.rootStore.sprintStore.activeSprint$
      .pipe(takeUntil(this.destroy$))
      .subscribe((activeSprint) => {
        this.activeSprint = activeSprint;
        this.activeStoriesSum = activeSprint.stories.reduce(
          (acc, s) => acc + s.time_complexity,
          0
        );
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  addStory() {
    this.dialog
      .open(StoryModalComponent, {
        data: {
          projectId: this.project.id,
          tests: [],
        },
      })
      .afterClosed()
      .subscribe((newStories) => {
        if (newStories) {
          this.productBacklog = newStories;
          this.rootStore.storyStore.setAllStories(newStories);
        }
      });
  }

  activateActiveSprint() {
    this.storiesToSprintActive = true;
  }

  cancelAddToActiveSprint() {
    this.storiesToSprintActive = false;
    this.activeStoriesSum = 0;
  }

  checkStoryToActiveSprint(event: MatCheckboxChange, story: Story) {
    if (event.checked) {
      this.activeStoriesSum += story.time_complexity;
      this.activeStories.push(story.id);
    } else {
      this.activeStoriesSum -= story.time_complexity;
      this.activeStories.splice(this.activeStories.indexOf(story.id), 1);
    }
  }

  addStoriesToActiveSprint() {
    if (this.activeStories.length)
      this.sprintService
        .addStoriesToActiveSprint(this.activeSprint.id, {
          story_ids: this.activeStories,
        })
        .subscribe(
          () => {
            this.storyService
              .getAllStories(this.project.id)
              .subscribe((data) => (this.productBacklog = data));
            this.storiesToSprintActive = false;
          },
          (err) => {
            this._snackBar.open(err.error.errors.join(" "), "", {
              duration: 5000,
              panelClass: ["snackbar-error"],
            });
          }
        );
  }

  // TODO: potrebno implementirati določanje časovne zahtevnosti
  // TODO: isto funkcijo lahko v prihodnjem sprintu uporabimo za implementacijo urejanja uporabniških zgodb
  editStory(
    title: string,
    description: string,
    tests: string[],
    businessValue: number,
    priorityId: number
  ) {
    console.log("edit story");

    /* this.dialog
      .open(StoryModalComponent, {
        data: {
          projectId: this.project.project.id,
          title,
          description,
          tests,
          businessValue,
          priorityId
        },
      })
      .afterClosed()
      .subscribe((newStories) => {
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
