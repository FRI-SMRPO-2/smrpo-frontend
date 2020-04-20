import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sprint-story',
  templateUrl: './sprint-story.component.html',
  styleUrls: ['./sprint-story.component.scss']
})
export class SprintStoryComponent implements OnInit {
  @Input() story;
  @Input() complexity;
  @Input() tasks;
  @Output() editButtonClick: EventEmitter<any> = new EventEmitter();

  constructor(
  ) {}

  editStory(event: any): void {
    event.stopPropagation();
    this.editButtonClick.emit();
  }

  ngOnInit(): void {
  }

}
