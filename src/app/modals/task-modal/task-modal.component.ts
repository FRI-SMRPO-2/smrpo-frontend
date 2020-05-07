import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SprintService } from 'src/app/services/sprint.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: "app-task-modal",
  templateUrl: "./task-modal.component.html",
  styleUrls: ["./task-modal.component.scss"],
})
export class TaskModalComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  processingRequest: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private sprintService: SprintService,
    private taskModalDialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  //TODO : to mormo spremenit ko bomo delali kartico #15
  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [{ value: this.data.title ?? "", disabled: this.data.editing }],
      description: [
        { value: this.data.description ?? "", disabled: this.data.editing },
      ],
      complexity: [
        { value: this.data.complexity ?? "", disabled: this.data.editing },
        [Validators.min(0), Validators.max(200)],
      ],
      assignee: [
        { value: this.data.assignee ?? "", disabled: this.data.editing },
      ],
    });
  }

  save() {
    if (this.processingRequest) return;

    this.processingRequest = true;
    const data = {
      title: this.form.value.title,
      description: this.form.value.description,
      estimated_time: this.form.value.complexity,
      assignee_awaiting_id: this.form.value.assignee,
    };

    this.taskService.addTask(this.data.storyId, data).subscribe(
      () => {
        this.sprintService
          .getActiveSprint(this.data.projectId)
          .subscribe((activeSprint) => {
            this.taskModalDialogRef.close(activeSprint);
          });
      },
      (err) => {
        console.log(err);
        this.processingRequest = false;
        this.errorMessage =
          (err.error && err.error.text) ||
          (err.error.__all__ && err.error.__all__.join(" ")) ||
          err.error ||
          "Prišlo je do napake.";
      }
    );
  }

  get complexity() {
    return this.form.get("complexity");
  }
}
