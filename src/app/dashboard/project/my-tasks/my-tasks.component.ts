import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: "app-my-tasks",
  templateUrl: "./my-tasks.component.html",
  styleUrls: ["./my-tasks.component.scss"],
})
export class MyTasksComponent implements OnInit {
  tasks = {
    finished: [],
    active: [],
    awaiting: [],
    unrealized: [],
  };

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //TODO: Posortiraj glede na projekt id
    this.userService.getMyTasks().subscribe((tasks) => {
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
      },
      (err) => this.showErrorSnackBar(err)
    );
  }

  taskRejected(id: number, index: number) {
    this.taskService.rejectTask(id).subscribe(
      () => {
        this.tasks.awaiting.splice(index, 1);
      },
      (err) => this.showErrorSnackBar(err)
    );
  }

  taskFinished(id: number, index: number) {
    this.taskService.finishTask(id).subscribe(
      () => {
        const task = this.tasks.unrealized[index];
        this.tasks.finished.push({ ...task, finished: true });
        this.tasks.unrealized.splice(index, 1);
      },
      (err) => this.showErrorSnackBar(err)
    );
  }

  showErrorSnackBar(err) {
    if (err.error)
      this.snackBar.open(err.error, "", {
        duration: 5000,
        panelClass: ["snackbar-error"],
      });
  }
}
