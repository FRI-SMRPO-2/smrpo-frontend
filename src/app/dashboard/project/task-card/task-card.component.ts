import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Story } from '../../../interfaces/story.interface';

@Component({
  selector: "app-task-card",
  templateUrl: "./task-card.component.html",
  styleUrls: ["./task-card.component.scss"],
})
export class TaskCardComponent implements OnInit {
  @Input() story: Story;
  @Input() complexity;
  @Input() disabled: boolean;
  @Output() editButtonClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.story);
  }
}

//TODO: to komponento je potrebno renamat oz meli bomo story card,
//      task card bo za naloge
