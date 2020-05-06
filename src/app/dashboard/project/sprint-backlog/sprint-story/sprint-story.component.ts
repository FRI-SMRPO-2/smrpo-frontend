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
  @Input() resolvingStories;
  @Output() acceptStory: EventEmitter<number> = new EventEmitter<number>();
  @Output() rejectStory: EventEmitter<any> = new EventEmitter<any>();
  @Output() rejectionComment: EventEmitter<any> = new EventEmitter<any>();

  accepted: boolean;
  rejected: boolean;
  comment: string;

  constructor() {}

  editStory(event: any): void {
    event.stopPropagation();
    this.editButtonClick.emit();
  }

  updateComment(data) {
    this.rejectionComment.emit(data);
  }

  toggleCheckbox(event) {
    event.source.name === 'accept' ?
    (this.accepted = !this.accepted, this.rejected = false, this.acceptStory.emit(this.story.id), this.comment = '') :
    (this.accepted = false, this.rejected = !this.rejected,  this.rejectStory.emit(this.story.id), this.comment = '');
  }

  ngOnInit(): void {}
}
