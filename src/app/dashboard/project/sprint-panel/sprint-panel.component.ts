import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sprint-panel',
  templateUrl: './sprint-panel.component.html',
  styleUrls: ['./sprint-panel.component.scss']
})
export class SprintPanelComponent implements OnInit {
  @Input() startDate;
  @Input() endDate;
  @Input() stories;

  task;

  constructor() {}

  ngOnInit(): void {}
}
