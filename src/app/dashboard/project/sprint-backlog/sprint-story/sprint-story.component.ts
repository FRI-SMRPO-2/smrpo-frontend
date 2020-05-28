import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Story } from '../../../../interfaces/story.interface';
import { Task } from '../../../../interfaces/task.interface';
import { User } from '../../../../interfaces/user.interface';
import { ConfirmationComponent } from '../../../../modals/confirmation/confirmation.component';
import { TaskCalendarComponent } from '../../../../modals/task-calendar/task-calendar.component';
import { TaskService } from '../../../../services/task.service';
import { RootStore } from '../../../../store/root.store';
import { SprintService } from 'src/app/services/sprint.service';

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
  @Output() editTaskCallback: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteTaskCallback: EventEmitter<any> = new EventEmitter<any>();

  accepted: boolean;
  rejected: boolean;
  comment: string;

  currentUser: User;
  isAdmin: boolean;

  constructor(
    private taskService: TaskService,
    private sprintService: SprintService,
    private snackBar: MatSnackBar,
    private rootStore: RootStore,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentUser = this.rootStore.userStore.user;
    this.isAdmin = this.rootStore.userStore.user.is_superuser;
  }

  editStory(event: any): void {
    event.stopPropagation();
    this.editButtonClick.emit();
  }

  updateComment(data) {
    this.rejectionComment.emit(data);
  }

  updateTask(data){
    this.editTaskCallback.emit(data);
  }

  deleteTask(taskId: number){

    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.rootStore.projectStore.activeProject$.subscribe((project) => {
          this.sprintService
          .getActiveSprint(project.id)
          .subscribe((activeSprint) => {
            this.deleteTaskCallback.emit(activeSprint);
          },
          (err)=>{});
        })
      },
      (err) => {}
    );
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

  rejectTask(task: Task, index: number, wasAccepted: boolean) {
    this.taskService.rejectTask(task.id).subscribe(
      () => {
        task.assignee_awaiting = null;
        if (wasAccepted) {
          task.assignee = null;
          this.tasks.unassigned.push(task);
          this.tasks.assigned.splice(index, 1);
        }
      },
      (err) => this.showErrorSnackBar(err)
    );
  }

  finishTask(task: Task, index: number, isActive: boolean) {
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
              if (isActive) this.tasks.active.splice(index, 1);
              else this.tasks.assigned.splice(index, 1);
            },
            (err) => this.showErrorSnackBar(err)
          );
        }
      });
  }

  taskSetActive(task: Task, index: number) {
    this.taskService.startWorkOnTask(task.id).subscribe(
      (data) => {
        console.log("active");
        this.tasks.active.push({ ...task, active: true });
        this.tasks.assigned.splice(index, 1);
      },
      (err) => {
        console.log(err);
        this.showErrorSnackBar(err);
      }
    );
  }

  taskUnsetActive(task: Task, index: number) {
    this.taskService.stopWorkOnTask(task.id).subscribe(
      (data) => {
        console.log("unsactive");
        this.tasks.assigned.push({ ...task, active: false });
        this.tasks.active.splice(index, 1);
      },
      (err) => {
        console.log(err);
        this.showErrorSnackBar(err);
      }
    );
  }

  openWorkSessionCalendar(task: Task, canEdit) {
    console.log(canEdit);
    console.log(this.currentUser, task.assignee);
    canEdit =
      canEdit && (this.currentUser.username === task.assignee || this.isAdmin);
    console.log(canEdit);
    this.dialog
      .open(TaskCalendarComponent, {
        data: {
          task,
          canEdit,
        },
      })
      .afterClosed()
      .subscribe();
  }

  showErrorSnackBar(err) {
    if (err.error)
      this.snackBar.open(err.error, "", {
        duration: 5000,
        panelClass: ["snackbar-error"],
      });
  }
}
