import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ProjectRole } from '../../../interfaces/project.interface';

@Component({
  selector: "app-project-modal-users-table",
  templateUrl: "./project-modal-users-table.component.html",
  styleUrls: ["./project-modal-users-table.component.scss"],
})
export class ProjectModalUsersTableComponent implements OnInit {
  @Input() users: AbstractControl[];
  @Input() roles: ProjectRole[];

  @Output() onRemove = new EventEmitter<number>();

  columns = ["username", "options"];

  constructor() {}

  ngOnInit() {}
}
