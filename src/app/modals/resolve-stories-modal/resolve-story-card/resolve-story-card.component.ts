import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-resolve-story-card',
  templateUrl: './resolve-story-card.component.html',
  styleUrls: ['./resolve-story-card.component.scss']
})
export class ResolveStoryCardComponent implements OnInit {
  @Input() id;
  @Input() name;
  @Input() allTasksFinished;
  @Output() acceptStory: EventEmitter<number> = new EventEmitter<number>();
  @Output() rejectStory: EventEmitter<any> = new EventEmitter<any>();
  @Output() rejectionComment: EventEmitter<any> = new EventEmitter<any>();


  expanded = false;
  accepted = false;
  rejected = false;
  comment: string;

  updateComment(data){
    this.rejectionComment.emit(data);
  }

  toggleCheckbox(event){
    event.source.name === 'accept' ?
    (this.accepted = !this.accepted, this.rejected = false, this.expanded = false, this.acceptStory.emit(this.id), this.comment="") :
    (this.accepted = false, this.rejected = !this.rejected, this.expanded = this.rejected, this.rejectStory.emit(this.id), this.comment="")
  }

  constructor() {}

  ngOnInit(): void {
  }
}
