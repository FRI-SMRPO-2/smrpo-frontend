import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ProjectService } from '../../services/project.service';
import { SprintService } from '../../services/sprint.service';
import { RootStore } from '../../store/root.store';
import { SprintModalComponent } from 'src/app/modals/sprint-modal/sprint-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StoryModalComponent } from 'src/app/modals/story-modal/story-modal.component';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { StoryService } from 'src/app/services/story.service';
import { Story } from 'src/app/interfaces/story.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
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
  userRole: string;

  sprintBacklog = [{ title: 'Zgodba #4', priority: 'musthave' }];

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
  ) {}

  ngOnInit() {

    // TODO: to se najbrz da zdruzit? :D

    // BUG: če si admin, in pogledaš projekt, v katerem nisi member, getProjectRole(id) returna 404 in
    // se vse podere (tisti subscription se ne več izvede, tud če izbereš spet drug projekt)
    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.isLoaded = false;
          return this.projectService.getProjectById(id);
        })
      )
      .subscribe(project => {
        this.rootStore.projectStore.setActiveProject(project);
        setTimeout(() => {
          this.isLoaded = true;
        }, 300);
      });

    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.isLoaded = false;
          return this.sprintService.getAllSprints(id);
        })
      )
      .subscribe(sprints => {
        this.rootStore.sprintStore.setAllSprints(sprints);
        this.sprints = sprints;
      });

    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.isLoaded = false;
          return this.storyService.getAllStories(id);
        })
      )
      .subscribe(stories => {
        this.rootStore.storyStore.setAllStories(stories);
        console.log(stories);
        this.stories = stories;
        this.productBacklog = this.stories;
      });

    this.route.params
      .pipe(
        switchMap(({ id }) => {
          this.isLoaded = false;
          return this.userService.getProjectRole(id);
        })
      )
      .subscribe(user => {
        this.rootStore.userStore.setProjectRole(user.role);
        this.userRole = user.role;
        },
        error => console.log(error.detail)
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    console.log('CHANG');
  }

  addSprint() {
    this.sprintModalDialogRef = this.dialog.open(SprintModalComponent);
    this.sprintModalDialogRef.afterClosed().subscribe(newSprints => {
        if (newSprints) {
          this.sprints = newSprints;
        }
      });
  }

  addStory() {
    this.storyModalDialogRef = this.dialog.open(StoryModalComponent);
    this.storyModalDialogRef.afterClosed().subscribe(newStories => {
        if (newStories) {
          this.stories = newStories;
          this.productBacklog = newStories;
        }
      });
    /*
    this.storyModalDialogRef.afterClosed().subscribe(newSprints =>
      { if (newSprints)
          this.sprints=newSprints
      });
    */
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
