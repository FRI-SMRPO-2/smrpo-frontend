import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {
  @Input() task;
  @Input() complexity;
  @Output() editButtonClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

}


//TODO: to komponento je potrebno renamat oz meli bomo story card,
//      task card bo za naloge
