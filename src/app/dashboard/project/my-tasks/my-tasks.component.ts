import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmationComponent } from '../../../modals/confirmation/confirmation.component';
import { SprintService } from '../../../services/sprint.service';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';
import { RootStore } from '../../../store/root.store';

@Component({
  selector: "app-my-tasks",
  templateUrl: "./my-tasks.component.html",
  styleUrls: ["./my-tasks.component.scss"],
})
export class MyTasksComponent implements OnInit {
  projectId: number;

  tasks = {
    finished: [],
    active: [],
    awaiting: [],
    unrealized: [],
  };

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private sprintService: SprintService,
    private snackBar: MatSnackBar,
    private rootStore: RootStore,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectId = this.rootStore.projectStore.activeProject.id;

    this.userService.getMyTasks(this.projectId).subscribe((tasks) => {
      this.tasks.awaiting = tasks.assignee_awaiting_tasks;
      this.tasks.unrealized = tasks.assigned_tasks.filter(
        (t) => !t.active && !t.finished
      );
      this.tasks.finished = tasks.assigned_tasks.filter((t) => t.finished);
      this.tasks.active = tasks.assigned_tasks.filter((t) => t.active);
    });
  }

  taskAccepted(id: number, index: number) {
    this.taskService.acceptTask(id).subscribe(
      () => {
        const task = this.tasks.awaiting[index];
        this.tasks.unrealized.push(task);
        this.tasks.awaiting.splice(index, 1);
        this.sprintService
          .getActiveSprint(this.projectId)
          .subscribe((activeSprint) => {
            this.rootStore.sprintStore.setActiveSprint(activeSprint);
            this.rootStore.storyStore.setActiveSprintStories(
              activeSprint.stories
            );
          });
      },
      (err) => this.showErrorSnackBar(err)
    );
  }

  taskRejected(id: number, index: number) {
    this.taskService.rejectTask(id).subscribe(
      () => {
        this.tasks.awaiting.splice(index, 1);
        this.sprintService
          .getActiveSprint(this.projectId)
          .subscribe((activeSprint) => {
            this.rootStore.sprintStore.setActiveSprint(activeSprint);
            this.rootStore.storyStore.setActiveSprintStories(
              activeSprint.stories
            );
          });
      },
      (err) => this.showErrorSnackBar(err)
    );
  }

  taskFinished(id: number, index: number) {
    const task = this.tasks.unrealized[index];
    this.dialog
      .open(ConfirmationComponent, {
        data: {
          title: "Zaključena naloga",
          message: `Ali ste prepričani, da želite nalogo z naslovom
          ${task.title} označiti kot zaključeno?`,
        },
      })
      .afterClosed()
      .subscribe((isAccepted) => {
        if (isAccepted) {
          this.taskService.finishTask(id).subscribe(
            () => {
              this.tasks.finished.push({ ...task, finished: true });
              this.tasks.unrealized.splice(index, 1);
            },
            (err) => this.showErrorSnackBar(err)
          );
        }
      });
  }

  showErrorSnackBar(err) {
    if (err.error)
      this.snackBar.open(err.error, "", {
        duration: 5000,
        panelClass: ["snackbar-error"],
      });
  }
}
