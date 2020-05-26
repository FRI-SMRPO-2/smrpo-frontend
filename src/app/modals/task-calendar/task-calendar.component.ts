import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: "app-task-calendar",
  templateUrl: "./task-calendar.component.html",
  styleUrls: ["./task-calendar.component.scss"],
})
export class TaskCalendarComponent implements OnInit {
  weekMilisec = 604800000;
  task: Task;

  days;
  activeDay = "20.4";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task },
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.task = this.data.task;
    this.days = ["17.4", "18.4", "19.4", "20.4", "21.4", "22.4", "23.4"];
    const today = new Date();
    this.taskService
      .getWorkSession(
        this.task.id,
        today,
        new Date(today.getTime() - this.weekMilisec)
      )
      .subscribe((data) => console.log(data));
  }
}
