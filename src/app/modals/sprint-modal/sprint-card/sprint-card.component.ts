import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent implements OnInit {
  @Input() startDate;
  @Input() endDate;
  @Input() speed;
  @Input() active;
  @Input() canEdit;
  @Input() canEditSpeed;
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
