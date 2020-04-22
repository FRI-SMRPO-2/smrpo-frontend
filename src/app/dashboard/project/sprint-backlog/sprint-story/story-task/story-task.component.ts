import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/interfaces/task.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from 'src/app/modals/task-modal/task-modal.component';
import { User } from 'src/app/interfaces/user.interface';
import { RootStore } from 'src/app/store/root.store';
import { forkJoin, combineLatest } from 'rxjs';

@Component({
  selector: 'app-story-task',
  templateUrl: './story-task.component.html',
  styleUrls: ['./story-task.component.scss']
})
export class StoryTaskComponent implements OnInit {
  @Input() task: Task;
  @Input() users: User[];

  constructor(
    private dialog: MatDialog,
    private rootStore: RootStore
  ) {}

  ngOnInit(): void {
  }

  editTask(){
    this.rootStore.projectStore.activeProject$.subscribe((activeProject) => {

      let assignedUser = activeProject.developers.find(developer => developer.username === this.task.assignee_awaiting || developer.username === this.task.assignee)

      this.dialog.open(TaskModalComponent, {
        data: {
          editing: true,
          title: this.task.title,
          description: this.task.description,
          complexity: this.task.estimated_time,
          assignee: assignedUser === undefined ? null : assignedUser.id,
          users: activeProject.developers
        }
      })
    })



  }
}
