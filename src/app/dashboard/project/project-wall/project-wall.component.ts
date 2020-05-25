import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Project } from 'src/app/interfaces/project.interface';

import { User } from '../../../interfaces/user.interface';
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
    private dialog: MatDialog
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
}
