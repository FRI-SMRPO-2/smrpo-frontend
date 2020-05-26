import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent implements OnInit {
  @Input() startDate;
  @Input() endDate;
  @Input() active;
  @Input() canEdit;
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  editSprint() {
    this.onEdit.emit();
  }

  deleteSprint(){
    this.onDelete.emit();
  }

  ngOnInit(): void {}
}
