import { Component, OnInit, Input,  } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SprintService } from 'src/app/services/sprint.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RootStore } from 'src/app/store/root.store';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { Sprint } from 'src/app/interfaces/sprint.interface';



@Component({
  selector: 'app-sprint-modal',
  templateUrl: './sprint-modal.component.html',
  styleUrls: ['./sprint-modal.component.scss']
})
export class SprintModalComponent implements OnInit {
  form: FormGroup;
  startDateMin: Date;
  errorMessage: string;
  addingSprint: boolean;
  activeSprintId: number;
  sprintList: Sprint[];
  userRoles: string[];
  disableAnimation = true;

  constructor(
    private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private sprintModalDialogRef: MatDialogRef<SprintModalComponent>,
    private rootStore: RootStore,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {

    this.startDateMin = new Date();

    this.addingSprint = false;

    this.sprintList = this.data.sprints;
    this.activeSprintId = this.data.activeSprintId;
    this.userRoles = this.data.userRoles;

    this.form = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      expectedSpeed : ['', Validators.min(0)]
    });

  }

  ngAfterViewInit() : void{
    setTimeout(()=>this.disableAnimation=false);
  }

  save() {
    this.addingSprint = true;

    const formData = new FormData();
    formData.append('start_date', formatDate(this.form.value.startDate, 'yyyy-MM-dd', 'en-GB'));
    formData.append('end_date', formatDate(this.form.value.endDate, 'yyyy-MM-dd', 'en-GB'));
    formData.append('expected_speed', this.form.value.expectedSpeed);


    this.sprintService.addSprint(this.data.projectId, formData).subscribe(
      () => {
        this.sprintService.getAllSprints(this.data.projectId).subscribe((sprints) => {
          this.rootStore.sprintStore.setAllSprints(sprints);
          this.sprintList = sprints;

          this.sprintService.getActiveSprint(this.data.projectId).subscribe((activeSprint) => {

            if (activeSprint){
              this.rootStore.sprintStore.setActiveSprint(activeSprint);
              this.rootStore.storyStore.setActiveSprintStories(activeSprint.stories);
              this.activeSprintId = activeSprint.id;
            }
          }),
          (err) => {}
          this.addingSprint = false;
          //this.sprintModalDialogRef.close(sprints);
        });
      },
      (err) => {
        this.addingSprint = false;
        this.errorMessage = err.error.message;
      })

  }
}
