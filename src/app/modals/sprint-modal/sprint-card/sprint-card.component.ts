import { Component, Input, OnInit } from '@angular/core';
import { SprintDatePipe } from 'src/app/shared/sprintDate.pipe';


@Component({
  selector: 'app-sprint-card',
  templateUrl: './sprint-card.component.html',
  styleUrls: ['./sprint-card.component.scss']
})
export class SprintCardComponent implements OnInit {
  @Input() startDate;
  @Input() endDate;
  @Input() active;

  constructor() {}

  editSprint() {
    console.log("Edit sprint")
  }

  ngOnInit(): void {}
}
