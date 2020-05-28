import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SprintService } from 'src/app/services/sprint.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RootStore } from 'src/app/store/root.store';
import { Inject } from '@angular/core';
import { Sprint } from 'src/app/interfaces/sprint.interface';
import { EditSprintModalComponent } from './edit-sprint-modal/edit-sprint-modal.component';

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
    private dialog: MatDialog,
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

  canEdit(start_date: string): boolean {
    if (this.userRoles.includes('Admin') || this.userRoles.includes('Scrum Master')){
      return (new Date(start_date) > new Date());
    }
    return false;
  }

  deleteSprint(sprintId: number){
    this.sprintService.deleteSprint(this.data.projectId, sprintId).subscribe(
      () => {
        this.sprintService.getAllSprints(this.data.projectId).subscribe((sprints) => {
          this.rootStore.sprintStore.setAllSprints(sprints);
          this.sprintList = sprints;
        })
      }
    )
  }

  getDateFromString(stringDate: string): Date{
    return new Date(stringDate);
  }

  editSprint(sprintId: number, startDate: string, endDate: string, expectedSpeed: number, active: boolean){
    this.dialog.open(EditSprintModalComponent, {
      data: {
        projectId: this.data.projectId,
        sprintId,
        startDate: this.getDateFromString(startDate),
        endDate: this.getDateFromString(endDate),
        expectedSpeed,
        active
      },
    })
    .afterClosed()
    .subscribe(
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
        });
      },
      (err) => {}
    );
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
