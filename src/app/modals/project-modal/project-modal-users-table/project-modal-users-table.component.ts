import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-project-modal-users-table',
  templateUrl: './project-modal-users-table.component.html',
  styleUrls: ['./project-modal-users-table.component.scss']
})
export class ProjectModalUsersTableComponent implements OnInit {
  @Input() users: AbstractControl[];

  @Output() onRemove = new EventEmitter<number>();

  columns = ['username', 'role', 'options'];

  constructor() {}

  ngOnInit(): void {}
}
