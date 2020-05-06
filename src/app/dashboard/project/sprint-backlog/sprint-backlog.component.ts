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
import { TaskModalComponent } from 'src/app/modals/task-modal/task-modal.component';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { StoryService } from 'src/app/services/story.service';
import { SprintService } from 'src/app/services/sprint.service';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: "app-sprint-backlog",
  templateUrl: "./sprint-backlog.component.html",
  styleUrls: ["./sprint-backlog.component.scss"],
})
export class SprintBacklogComponent implements OnInit {
  isAdmin: boolean;
  user: User;
  userRoles: string[];

  project: Project;
  stories: Story[];
  sprints: Sprint[];
  activeSprint: Sprint;

  resolvingStories: boolean;
  resolvingStoriesSendingData: boolean;
  acceptedStories = [];
  rejectedStories = [];

  errorMessage: String;

  constructor(
    private route: ActivatedRoute,
    private rootStore: RootStore,
    private dialog: MatDialog,
    private storyService: StoryService,
    private sprintService: SprintService
  ) {}

  ngOnInit(): void {
    this.rootStore.userStore.user$.subscribe((user) => {
      this.isAdmin = user.is_superuser;
    });

    this.rootStore.projectStore.activeProject$.subscribe((project) => {
      this.project = project;
    });

    this.rootStore.storyStore.activeSprintStories$.subscribe((stories) => {
      this.stories = stories;
    });

    this.rootStore.sprintStore.allSprints$.subscribe((sprints) => {
      this.sprints = sprints;
    })

    this.rootStore.sprintStore.activeSprint$.subscribe((activeSprint) => {
      this.activeSprint = activeSprint;
    })

    this.rootStore.userStore.userRoles$.subscribe((userRoles)=>{
      this.userRoles = userRoles ?? [];
    })

    this.resolvingStories = false;
    this.resolvingStoriesSendingData = false;
  }

  viewSprints() {
    this.dialog
      .open(SprintModalComponent, {
        data: {
          projectId: this.project.id,
          sprints: this.sprints,
          activeSprintId: this.activeSprint==null ? 0 : this.activeSprint.id,
          userRoles: this.isAdmin ? ['Admin'] : this.userRoles
        },
      });
  }

  acceptStory(id: number){
    const index1 = this.acceptedStories.indexOf(id);
    if (index1 === -1){
      this.acceptedStories.push(id)
    }
    else{
      this.acceptedStories.splice(index1, 1)
    }

    const index2 = this.rejectedStories.findIndex(x => x.id === id);
    if (index2 >= 0) {
      this.rejectedStories.splice(index2, 1);
    }
  }

  rejectStory(id: number){

    const index1 = this.acceptedStories.indexOf(id);
    if (index1>=0){
      this.acceptedStories.splice(index1, 1);
    }

    const index2 = this.rejectedStories.findIndex(x => x.id === id);
    if (index2>=0) {
      this.rejectedStories.splice(index2,1)
    }
    else{
      this.rejectedStories.push(
        {
          id: id,
          comment: ""
        }
      )
    }
  }

  rejectionComment(data: {id: number, comment: string}){
    let object = this.rejectedStories.find(x => x.id === data.id);
    object.comment = data.comment;
  }

  resolveStories() {
    this.resolvingStoriesSendingData = true;
    this.errorMessage = '';

    forkJoin([
      this.acceptedStories.length > 0 ? this.storyService.acceptStories(this.project.id, {"stories": this.acceptedStories}) : of({}),
      this.rejectedStories.length > 0 ? this.storyService.rejectStories(this.project.id, {"stories": this.rejectedStories}) : of({})
    ]).subscribe(
      ()=> {
        forkJoin([
          this.storyService.getAllStories(this.project.id),
          this.sprintService.getActiveSprint(this.project.id)
        ])
        .subscribe(
          ([stories, activeSprint]) =>{
            this.resolvingStories = false;
            this.resolvingStoriesSendingData = false;

            if (stories){
              this.rootStore.storyStore.setAllStories(stories);
            }

            if (activeSprint){
              this.activeSprint = activeSprint;
              this.rootStore.sprintStore.setActiveSprint(activeSprint);
              this.stories = this.activeSprint.stories;
              this.rootStore.storyStore.setActiveSprintStories(this.stories)
            }
          }
        )
      },
      (err) =>{
        console.log(err),
        this.resolvingStoriesSendingData = false;
        // TODO: probably not handling correctly
        if (err.status<500){
          this.errorMessage = err.error === undefined ? 'Something went wrong, try again later' : err.error;
        }
        else{
          this.errorMessage = 'Something went wrong, try again later';
        }
      }
    )

    /*
    this.dialog
      .open(ResolveStoriesModalComponent, {
        data: {
          projectId: this.project.id,
          stories: this.stories,
        }
      })
      .afterClosed()
      .subscribe((data) => {
        if (data){
          if (data.stories){
            this.rootStore.storyStore.setAllStories(data.stories);
          }
          if (data.activeSprint){
            this.activeSprint = data.activeSprint;
            this.rootStore.sprintStore.setActiveSprint(data.activeSprint);
            this.stories = this.activeSprint.stories;
            this.rootStore.storyStore.setActiveSprintStories(this.stories)
          }
        }
      })
      */
  }

  maxTaskTime(story: Story){
    let storyComplexity = story.time_complexity;
    let usedComplexity = 0;

    for (let task of story.tasks.unassigned){
      usedComplexity = usedComplexity + task.estimated_time;
    }

    for (let task of story.tasks.assigned){
      usedComplexity = usedComplexity + task.estimated_time;
    }

    for (let task of story.tasks.active){
      usedComplexity = usedComplexity + task.estimated_time;
    }

    for (let task of story.tasks.finished){
      usedComplexity = usedComplexity + task.estimated_time;
    }

    return Math.max(0, storyComplexity - usedComplexity);
  }

  addTask(story: Story){
    this.dialog
      .open(TaskModalComponent, {
        data: {
          projectId: this.project.id,
          storyId: story.id,
          users: this.project.developers,
          availableComplexity: this.maxTaskTime(story)
        }
      })
      .afterClosed()
      .subscribe((activeSprint) => {
        if (activeSprint){
          this.activeSprint = activeSprint;
          this.rootStore.sprintStore.setActiveSprint(activeSprint);
          this.stories = this.activeSprint.stories;
          this.rootStore.storyStore.setActiveSprintStories(this.stories)
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
