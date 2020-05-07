import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Story } from '../../../../interfaces/story.interface';
import { Task } from '../../../../interfaces/task.interface';
import { User } from '../../../../interfaces/user.interface';
import { ConfirmationComponent } from '../../../../modals/confirmation/confirmation.component';
import { TaskService } from '../../../../services/task.service';
import { RootStore } from '../../../../store/root.store';

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

  currentUser: User;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private rootStore: RootStore,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser = this.rootStore.userStore.user;
  }

  editStory(event: any): void {
    event.stopPropagation();
    this.editButtonClick.emit();
  }

  updateComment(data) {
    this.rejectionComment.emit(data);
  }

  toggleCheckbox(event) {
    event.source.name === "accept"
      ? ((this.accepted = !this.accepted),
        (this.rejected = false),
        this.acceptStory.emit(this.story.id),
        (this.comment = ""))
      : ((this.accepted = false),
        (this.rejected = !this.rejected),
        this.rejectStory.emit(this.story.id),
        (this.comment = ""));
  }

  acceptTask(task: Task, index) {
    this.taskService.acceptTask(task.id).subscribe(
      () => {
        if (task.assignee) task.assignee = task.assignee_awaiting;
        else task.assignee = this.currentUser.username;

        task.assignee_awaiting = null;
        this.tasks.assigned.push(task);
        this.tasks.unassigned.splice(index, 1);
      },
      (err) => this.showErrorSnackBar(err)
    );
  }

  rejectTask(task: Task) {
    this.taskService.rejectTask(task.id).subscribe(
      () => {
        task.assignee_awaiting = null;
      },
      (err) => this.showErrorSnackBar(err)
    );
  }

  finishTask(task: Task, index) {
    this.dialog
      .open(ConfirmationComponent, {
        data: {
          title: "Zaključena naloga",
          message: `Ali ste prepričani, da želite nalogo z naslovom
          ${task.title} označiti kot zaključeno?`,
        },
      })
      .afterClosed()
      .subscribe((isAccepted) => {
        if (isAccepted) {
          this.taskService.finishTask(task.id).subscribe(
            () => {
              this.tasks.finished.push({ ...task, finished: true });
              this.tasks.assigned.splice(index, 1);
            },
            (err) => this.showErrorSnackBar(err)
          );
        }
      });
  }

  showErrorSnackBar(err) {
    if (err.error)
      this.snackBar.open(err.error, "", {
        duration: 5000,
        panelClass: ["snackbar-error"],
      });
  }
}
