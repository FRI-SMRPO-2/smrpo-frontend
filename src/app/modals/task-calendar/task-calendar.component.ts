import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';

import { Sprint } from '../../interfaces/sprint.interface';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { RootStore } from '../../store/root.store';

@Component({
  selector: "app-task-calendar",
  templateUrl: "./task-calendar.component.html",
  styleUrls: ["./task-calendar.component.scss"],
})
export class TaskCalendarComponent implements OnInit {
  today = new Date();
  created: Date;
  dayMiliseconds = 86400000;
  activeSprint: Sprint;

  datesArray: FormArray;
  canEdit: boolean;

  task: Task;
  currentWeekShowed: boolean = true;
  currentWeek = 0;

  days;
  calendarDays;
  calendarValues = [];

  showLeftBtn: boolean = true;
  showRightBtn: boolean = false;

  matcher = new ErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task; canEdit },
    private taskService: TaskService,
    private rootStore: RootStore,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TaskCalendarComponent>
  ) {}

  ngOnInit(): void {
    this.datesArray = this.formBuilder.array([]);
    this.canEdit = this.data.canEdit;
    console.log(this.data.canEdit);
    this.activeSprint = this.rootStore.sprintStore.activeSprint;

    this.task = this.data.task;
    this.created = new Date(this.task.created);
    this.created.setHours(0, 0, 0, 0);

    this.getWorkSession(
      new Date(this.today.getTime() - 6 * this.dayMiliseconds),
      this.today,
      "right"
    );
  }

  weekEarlier() {
    this.currentWeek += 1;
    const start = new Date(
      this.today.getTime() - (6 + 7 * this.currentWeek) * this.dayMiliseconds
    );
    const end = new Date(
      this.today.getTime() - 7 * this.currentWeek * this.dayMiliseconds
    );
    this.getWorkSession(start, end, "left");
  }

  weekOlder() {
    this.currentWeek -= 1;
    const start = new Date(
      this.today.getTime() - (6 + 7 * this.currentWeek) * this.dayMiliseconds
    );
    const end = new Date(
      this.today.getTime() - 7 * this.currentWeek * this.dayMiliseconds
    );
    this.getWorkSession(start, end, "right");
  }

  getWorkSession(start, end, type: "left" | "right") {
    this.showLeftBtn = true;
    this.showRightBtn = true;

    this.taskService
      .getWorkSession(this.task.id, start, end)
      .subscribe((data) => {
        let valid = true;
        while (this.datesArray.length) {
          this.datesArray.removeAt(0);
        }

        Object.keys(data).map((d) => {
          const day = this.formBuilder.group({
            date: d,
            valid: new Date(d) >= this.created,
            hours: [this.roundOn2Decimals(data[d].hours), Validators.min(0)],
            estimated_hours: [
              this.roundOn2Decimals(data[d].estimated_hours),
              Validators.min(0),
            ],
          });
          this.datesArray.push(day);
          day.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
            const formated = { ...data };
            delete formated["valid"];
            if (day.valid)
              this.taskService
                .editWorkSession(this.task.id, formated)
                .subscribe((data) =>
                  console.log("Posodobljeno pred 0 sekundami")
                );
          });
          if (!(new Date(d) >= this.created)) {
            valid = false;
          }
        });

        if (type === "left" && !valid) {
          this.showLeftBtn = false;
        } else if (type === "right") {
          this.showRightBtn =
            new Date(end) < new Date(this.today.setHours(0, 0, 0, 0));
          console.log(end, "end");
          console.log(
            new Date(end) < new Date(this.today.setHours(0, 0, 0, 0)),
            new Date(this.today.setHours(0, 0, 0, 0))
          );
        }
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  waitAndCloseDialog() {
    setTimeout(() => this.dialogRef.close(), 500);
  }

  dateToDay(date: Date) {
    console.log(date);
    return ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"][
      new Date(date).getDay()
    ];
  }

  getDateValue(index: number) {
    return this.datesArray.at(index);
  }

  roundOn2Decimals(num: number) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }
}
