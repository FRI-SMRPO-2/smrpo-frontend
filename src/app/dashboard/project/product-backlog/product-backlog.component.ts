import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ProductBacklog} from '../../../interfaces/story.interface';
import { User } from '../../../interfaces/user.interface';
import { StoryModalComponent } from '../../../modals/story-modal/story-modal.component';
import { RootStore } from '../../../store/root.store';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
  selector: "app-product-backlog",
  templateUrl: "./product-backlog.component.html",
  styleUrls: ["./product-backlog.component.scss"],
})
export class ProductBacklogComponent implements OnInit {
  isAdmin: boolean;
  user: User;
  userRoles: string[];

  project: Project;

  productBacklog: ProductBacklog;

  constructor(
    private route: ActivatedRoute,
    private rootStore: RootStore,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.rootStore.userStore.user$.subscribe((user) => {
      this.isAdmin = user.is_superuser;
    });

    this.rootStore.projectStore.activeProject$.subscribe((project) => {
      this.project = project;
    });

    this.rootStore.storyStore.allStories$.subscribe((stories) => {
      this.productBacklog = stories;
    });

    this.rootStore.userStore.userRoles$.subscribe((userRoles)=>{
      this.userRoles = userRoles ?? [];
    })
  }

  addStory() {
    this.dialog
      .open(StoryModalComponent, {
        data: {
          projectId: this.project.id,
          tests: []
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

  // TODO: potrebno implementirati določanje časovne zahtevnosti
  // TODO: isto funkcijo lahko v prihodnjem sprintu uporabimo za implementacijo urejanja uporabniških zgodb
  editStory(title: string, description: string, tests: string[], businessValue: number, priorityId: number) {
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
