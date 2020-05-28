import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { User } from 'src/app/interfaces/user.interface';
import { TaskModalComponent } from 'src/app/modals/task-modal/task-modal.component';
import { RootStore } from 'src/app/store/root.store';

@Component({
  selector: "app-story-task",
  templateUrl: "./story-task.component.html",
  styleUrls: ["./story-task.component.scss"],
})
export class StoryTaskComponent implements OnInit {
  @Input() task: Task;
  @Input() users: User[];
  @Input() unassigned: boolean;
  @Input() canEdit;
  @Input() canDelete;

  @Output() taskAccepted: EventEmitter<number> = new EventEmitter<number>();
  @Output() taskRejected: EventEmitter<number> = new EventEmitter<number>();
  @Output() taskFinished: EventEmitter<number> = new EventEmitter<number>();
  @Output() taskSetActive: EventEmitter<number> = new EventEmitter<number>();
  @Output() taskUnsetActive: EventEmitter<number> = new EventEmitter<number>();
  @Output() openWorkSessionCalendar: EventEmitter<any> = new EventEmitter();
  @Output() editTaskFinalCallback: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();


  currentUser: User;

  constructor(private dialog: MatDialog, private rootStore: RootStore) {}

  ngOnInit(): void {
    this.currentUser = this.rootStore.userStore.user;
  }

  editTask() {
    this.rootStore.projectStore.activeProject$.subscribe((activeProject) => {
      let assignedUser = activeProject.developers.find(
        (developer) =>
          developer.username === this.task.assignee_awaiting ||
          developer.username === this.task.assignee
      );

      this.dialog.open(TaskModalComponent, {
        data: {
          editing: true,
          title: this.task.title,
          description: this.task.description,
          complexity: this.task.estimated_time,
          assignee: assignedUser === undefined ? null : assignedUser.id,
          canEdit: this.canEdit,
          unassigned: this.unassigned,
          users: activeProject.developers,
          taskId: this.task.id
        },
      })
      .afterClosed()
      .subscribe((newSprint) => {
        this.editTaskFinalCallback.emit(newSprint);
      })
    });
  }
}
