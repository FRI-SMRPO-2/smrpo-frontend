import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-task-calendar",
  templateUrl: "./task-calendar.component.html",
  styleUrls: ["./task-calendar.component.scss"],
})
export class TaskCalendarComponent implements OnInit {
  days;
  activeDay = "20.4";

  constructor() {}

  ngOnInit(): void {
    this.days = ["17.4", "18.4", "19.4", "20.4", "21.4", "22.4", "23.4"];
  }
}
