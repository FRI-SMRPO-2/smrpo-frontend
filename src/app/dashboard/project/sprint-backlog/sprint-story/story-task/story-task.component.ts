import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-story-task',
  templateUrl: './story-task.component.html',
  styleUrls: ['./story-task.component.scss']
})
export class StoryTaskComponent implements OnInit {
  @Input() task: Task;
  @Output() editButtonClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }
}
