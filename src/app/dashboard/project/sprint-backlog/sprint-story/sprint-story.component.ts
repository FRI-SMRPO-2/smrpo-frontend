import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Story } from '../../../../interfaces/story.interface';

@Component({
  selector: "app-sprint-story",
  templateUrl: "./sprint-story.component.html",
  styleUrls: ["./sprint-story.component.scss"],
})
export class SprintStoryComponent implements OnInit {
  @Input() story: Story;
  @Input() complexity;
  @Input() tasks;
  @Input() userRoles;
  @Output() editButtonClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  editStory(event: any): void {
    event.stopPropagation();
    this.editButtonClick.emit();
  }

  ngOnInit(): void {}
}
