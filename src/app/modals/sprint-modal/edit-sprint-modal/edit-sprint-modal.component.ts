import { Component, OnInit} from '@angular/core';
import { FormBuilder,  FormGroup,  Validators} from '@angular/forms';
import { formatDate } from '@angular/common';
import { SprintService } from 'src/app/services/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-edit-sprint-modal',
  templateUrl: './edit-sprint-modal.component.html',
  styleUrls: ['./edit-sprint-modal.component.scss']
})
export class EditSprintModalComponent implements OnInit {
  startDateMin: Date;
  errorMessage: string;
  editingSprint: boolean;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private editSprintModalDialogRef: MatDialogRef<EditSprintModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {

    this.startDateMin = new Date();

    this.editingSprint = false;

    this.form = this.formBuilder.group({
      startDate: this.data.startDate,
      endDate: this.data.endDate,
      expectedSpeed : [this.data.expectedSpeed, Validators.min(0)]
    });
  }

  save() {
    this.editingSprint = true;

    const formData = new FormData();
    formData.append('start_date', formatDate(this.form.value.startDate, 'yyyy-MM-dd', 'en-GB'));
    formData.append('end_date', formatDate(this.form.value.endDate, 'yyyy-MM-dd', 'en-GB'));
    formData.append('expected_speed', this.form.value.expectedSpeed);

    this.sprintService.updateSprint(this.data.projectId, this.data.sprintId, formData).subscribe(
      () => {
          this.editingSprint = false;
          this.editSprintModalDialogRef.close();
      },
      (err) => {
        this.editingSprint = false;
        this.errorMessage = err.error.message;
      }
    );
  }
}
