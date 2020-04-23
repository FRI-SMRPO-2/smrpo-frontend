import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControlStatus} from '@angular/forms';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: "app-task-modal",
  templateUrl: "./task-modal.component.html",
  styleUrls: ["./task-modal.component.scss"]
})
export class TaskModalComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  addingTask: boolean;
  availableComplexity: number;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private sprintService: SprintService,
    private taskModalDialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.addingTask= false;
    this.availableComplexity = this.data.availableComplexity;

    this.form = this.formBuilder.group({
      title: [{value: this.data.title ?? '', disabled: this.data.editing}],
      description: [{value:this.data.description ?? '', disabled: this.data.editing}],
      complexity: [
        {value: this.data.complexity ?? '', disabled: this.data.editing},
        Validators.compose(
          [Validators.min(0), Validators.max(this.availableComplexity)]
        )
      ],
      assignee: [{value:this.data.assignee ?? '', disabled: this.data.editing}]
    });

  }

  save() {

    this.addingTask = true;

    let data = {title: "", description: "", estimated_time: "", assignee_awaiting_id: ""};
    data.title = this.form.value.title;
    data.description = this.form.value.description;
    data.estimated_time = this.form.value.complexity;
    data.assignee_awaiting_id = this.form.value.assignee;

    this.taskService.addTask(this.data.storyId, data).subscribe(
      () => {
        this.sprintService.getActiveSprint(this.data.projectId).subscribe((activeSprint) => {
          this.taskModalDialogRef.close(activeSprint);
        })
      },
      (err) => {
        this.addingTask = false;
        this.errorMessage = err.error.__all__ === undefined ? 'Something went wrong, try again later' : err.error.__all__[0];
      }
    );
  }
}
