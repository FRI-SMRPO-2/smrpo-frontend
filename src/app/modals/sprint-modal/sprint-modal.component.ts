import { Component, OnInit,  } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SprintService } from 'src/app/services/sprint.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RootStore } from 'src/app/store/root.store';
import { Observable } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';



@Component({
  selector: 'app-sprint-modal',
  templateUrl: './sprint-modal.component.html',
  styleUrls: ['./sprint-modal.component.scss']
})
export class SprintModalComponent implements OnInit {
  form: FormGroup;
  startDateMin: Date;
  errorMessage: string;
  activeProject$: Observable<Project>;
  addingSprint: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private sprintModalDialogRef: MatDialogRef<SprintModalComponent>,
    private rootStore: RootStore) {}

  ngOnInit() {
    this.activeProject$ = this.rootStore.projectStore.activeProject$;

    this.startDateMin = new Date();

    this.addingSprint = false;

    this.form = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      expectedSpeed : ['', Validators.min(0)]
    });
  }

  save() {
    this.addingSprint = true;

    const formData = new FormData();
    formData.append('start_date', formatDate(this.form.value.startDate, 'yyyy-MM-dd', 'en-GB'));
    formData.append('end_date', formatDate(this.form.value.endDate, 'yyyy-MM-dd', 'en-GB'));
    formData.append('expected_speed', this.form.value.expectedSpeed);

    this.activeProject$.subscribe((activeProject) =>
      this.sprintService.addSprint(activeProject.id, formData).subscribe(
        () => {
          this.sprintService.getAllSprints(activeProject.id).subscribe((sprints) => {
            this.rootStore.sprintStore.setAllSprints(sprints);
            this.sprintModalDialogRef.close(sprints);
          });
        },
        (err) => {
          this.addingSprint = false;
          this.errorMessage = err.error.message;
        })
    );
  }
}
