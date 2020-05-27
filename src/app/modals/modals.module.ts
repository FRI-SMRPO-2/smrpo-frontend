import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from '../shared/shared.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ImportDocumentationModalComponent } from './import-documentation-modal/import-documentation-modalcomponent';
import { PostModalComponent } from './post-modal/post-modal.component';
import {
  ProjectModalUsersTableComponent,
} from './project-modal/project-modal-users-table/project-modal-users-table.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { EditSprintModalComponent } from './sprint-modal/edit-sprint-modal/edit-sprint-modal.component';
import { SprintCardComponent } from './sprint-modal/sprint-card/sprint-card.component';
import { SprintModalComponent } from './sprint-modal/sprint-modal.component';
import { StoryModalComponent } from './story-modal/story-modal.component';
import { TaskCalendarComponent } from './task-calendar/task-calendar.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { UserModalComponent } from './user-modal/user-modal.component';

@NgModule({
  declarations: [
    ProjectModalComponent,
    ProjectModalUsersTableComponent,
    SprintModalComponent,
    StoryModalComponent,
    UserModalComponent,
    TaskModalComponent,
    PostModalComponent,
    ImportDocumentationModalComponent,
    SprintCardComponent,
    EditSprintModalComponent,
    ConfirmationComponent,
    TaskCalendarComponent,
  ],
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
    MatDatepickerModule,
    MatSnackBarModule,
    ScrollingModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
  ],
})
export class ModalsModule {}
