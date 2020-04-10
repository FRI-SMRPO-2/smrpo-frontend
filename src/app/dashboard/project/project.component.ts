import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { Story } from 'src/app/interfaces/story.interface';
import { SprintModalComponent } from 'src/app/modals/sprint-modal/sprint-modal.component';
import { StoryModalComponent } from 'src/app/modals/story-modal/story-modal.component';
import { StoryService } from 'src/app/services/story.service';
import { UserService } from 'src/app/services/user.service';

import { User } from '../../interfaces/user.interface';
import { ProjectService } from '../../services/project.service';
import { SprintService } from '../../services/sprint.service';
import { RootStore } from '../../store/root.store';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"]
})
export class ProjectComponent implements OnInit, OnDestroy {
  isLoaded = false;

  productBacklog: Story[];
  /*[
    { title: "Zgodba #1", priority: "musthave" },
    { title: "Zgodba #2", priority: "shouldhave" },
    { title: "Zgodba #3", priority: "couldhave" },
    { title: "Zgodba #4", priority: "wonthave" }
  ];
  */

  sprints: Sprint[];
  stories: Story[];
  userRoles: string[];
  isAdmin: boolean;
  projectId: number;

  sprintBacklog = [{ title: "Zgodba #4", priority: "musthave" }];

  sprintModalDialogRef: MatDialogRef<SprintModalComponent>;
  storyModalDialogRef: MatDialogRef<StoryModalComponent>;

  constructor(
    private route: ActivatedRoute,
    private rootStore: RootStore,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private storyService: StoryService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.userRoles = [];
  }

  ngOnInit() {
    this.rootStore.userStore.user$.subscribe((user) => this.isAdmin = user.is_superuser);

    // BUG: če si admin, in pogledaš projekt, v katerem nisi member, getProjectRole(id) returna 404 in
    // se vse podere (tisti subscription se ne več izvede, tud če izbereš spet drug projekt)
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.isLoaded = false;
          this.projectId = id;
          return forkJoin({
            project: this.projectService.getProjectById(id).pipe(catchError(() => null)),
            sprints: this.sprintService.getAllSprints(id).pipe(catchError(() => null)),
            stories: this.storyService.getAllStories(id).pipe(catchError(() => null)),
            user: this.isAdmin ? 'Project manager' : this.userService.getProjectRole(id).pipe(catchError(() => null))
          });
        })
      )
      .subscribe(({ project, sprints, stories, user }) => {
        if (project) {
          this.rootStore.projectStore.setActiveProject(project as Project);
        }

        if (sprints){
          this.rootStore.sprintStore.setAllSprints(sprints as Sprint[]);
          this.sprints = sprints as Sprint[];
        }

        if (stories){
          this.rootStore.storyStore.setAllStories(stories as Story[]);
          this.productBacklog = stories as Story[];
          this.stories = stories as Story[];
        }

        if (user && !this.isAdmin) {
          this.rootStore.userStore.setProjectRoles((user as User).role);
          this.userRoles = (user as User).role;
        }

        setTimeout(() => {
          this.isLoaded = true;
        }, 300);
      });
  }

  ngOnDestroy() {
    this.rootStore.projectStore.setActiveProject(null);
  }

  addSprint() {
    this.sprintModalDialogRef = this.dialog.open(SprintModalComponent, {data: {projectId: this.projectId}});
    this.sprintModalDialogRef.afterClosed().subscribe(newSprints => {
      if (newSprints) {
        this.sprints = newSprints;
      }
    });
  }

  addStory() {

    this.storyModalDialogRef = this.dialog.open(StoryModalComponent, {data: {projectId: this.projectId}});
    this.storyModalDialogRef.afterClosed().subscribe(newStories => {
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
