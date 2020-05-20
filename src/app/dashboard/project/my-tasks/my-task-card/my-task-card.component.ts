import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: "app-my-task-card",
  templateUrl: "./my-task-card.component.html",
  styleUrls: ["./my-task-card.component.scss"],
})
export class MyTaskCardComponent implements OnInit {
  @Input() task;
  @Input() acceptanceAwaiting: boolean;
  @Output() taskAccepted: EventEmitter<any> = new EventEmitter();
  @Output() taskRejected: EventEmitter<any> = new EventEmitter();
  @Output() taskFinished: EventEmitter<any> = new EventEmitter();
  @Output() taskSetActive: EventEmitter<any> = new EventEmitter();
  @Output() taskUnsetActive: EventEmitter<any> = new EventEmitter();
  @Output() openWorkSessionCalendar: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
