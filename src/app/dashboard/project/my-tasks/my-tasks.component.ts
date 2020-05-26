import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task } from '../../../interfaces/task.interface';
import { ConfirmationComponent } from '../../../modals/confirmation/confirmation.component';
import { TaskCalendarComponent } from '../../../modals/task-calendar/task-calendar.component';
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

  taskRejected(id: number, index: number, wasAccepted: boolean) {
    this.taskService.rejectTask(id).subscribe(
      () => {
        if (wasAccepted) {
          this.tasks.unrealized.splice(index, 1);
        } else {
          this.tasks.awaiting.splice(index, 1);
        }
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

  taskFinished(task: Task, index: number, isActive: boolean) {
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
          this.taskService.finishTask(task.id).subscribe(
            () => {
              this.tasks.finished.push({ ...task, finished: true });

              if (isActive) this.tasks.active.splice(index, 1);
              else this.tasks.unrealized.splice(index, 1);
            },
            (err) => this.showErrorSnackBar(err)
          );
        }
      });
  }

  taskSetActive(task: Task, index: number) {
    console.log("active");
    this.taskService.startWorkOnTask(task.id).subscribe(
      (data) => {
        console.log(data);
        this.tasks.active.push({ ...task, active: true });
        this.tasks.unrealized.splice(index, 1);
      },
      (err) => {
        console.log(err);
        this.showErrorSnackBar(err);
      }
    );
  }

  taskUnsetActive(task: Task, index: number) {
    console.log("unactive");
    this.taskService.stopWorkOnTask(task.id).subscribe(
      (data) => {
        console.log(data);
        this.tasks.unrealized.push({ ...task, active: false });
        this.tasks.active.splice(index, 1);
      },
      (err) => {
        console.log(err);
        this.showErrorSnackBar(err);
      }
    );
  }

  openWorkSessionCalendar(task: Task) {
    this.dialog
      .open(TaskCalendarComponent, {
        data: {
          task,
        },
      })
      .afterClosed()
      .subscribe((data) => {
        console.log(data);
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
