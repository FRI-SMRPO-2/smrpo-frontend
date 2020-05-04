import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import {
  ProjectModalUsersTableComponent,
} from './project-modal/project-modal-users-table/project-modal-users-table.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { SprintModalComponent } from './sprint-modal/sprint-modal.component';
import { StoryModalComponent } from './story-modal/story-modal.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SprintCardComponent } from './sprint-modal/sprint-card/sprint-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from '../shared/shared.module';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { ResolveStoriesModalComponent } from './resolve-stories-modal/resolve-stories-modal.component';
import { ResolveStoryCardComponent } from './resolve-stories-modal/resolve-story-card/resolve-story-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ProjectModalComponent,
    ProjectModalUsersTableComponent,
    SprintModalComponent,
    StoryModalComponent,
    UserModalComponent,
    TaskModalComponent,
    SprintCardComponent,
    ResolveStoriesModalComponent,
    ResolveStoryCardComponent
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
    MatCheckboxModule
  ],
})
export class ModalsModule {}
