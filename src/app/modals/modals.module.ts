import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  ProjectModalUsersTableComponent,
} from './project-modal/project-modal-users-table/project-modal-users-table.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { StoryModalComponent } from './story-modal/story-modal.component';
import { SprintModalComponent } from './sprint-modal/sprint-modal.component';

// Kar rabiš v modalu, dodaš v import
@NgModule({
  declarations: [ProjectModalComponent, ProjectModalUsersTableComponent, SprintModalComponent, StoryModalComponent],
  // entryComponents: [ProjectModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDatepickerModule
  ]
})
export class ModalsModule {}
