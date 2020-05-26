import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ModalsModule } from '../modals/modals.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { DocumentationComponent } from './project/documentation/documentation.component';
import { MyTaskCardComponent } from './project/my-tasks/my-task-card/my-task-card.component';
import { MyTasksComponent } from './project/my-tasks/my-tasks.component';
import { ProductBacklogComponent } from './project/product-backlog/product-backlog.component';
import { PostCardComponent } from './project/project-wall/post-card/post-card.component';
import { ProjectWallComponent } from './project/project-wall/project-wall.component';
import { ProjectComponent } from './project/project.component';
import { SettingsComponent } from './project/settings/settings.component';
import { SprintBacklogComponent } from './project/sprint-backlog/sprint-backlog.component';
import { SprintStoryComponent } from './project/sprint-backlog/sprint-story/sprint-story.component';
import { StoryTaskComponent } from './project/sprint-backlog/sprint-story/story-task/story-task.component';
import { TaskCardComponent } from './project/task-card/task-card.component';

@NgModule({
  declarations: [
    ProjectComponent,
    HomeComponent,
    DashboardComponent,
    TaskCardComponent,
    PostCardComponent,
    ProjectWallComponent,
    ProductBacklogComponent,
    SprintBacklogComponent,
    DocumentationComponent,
    SprintStoryComponent,
    StoryTaskComponent,
    MyTasksComponent,
    MyTaskCardComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    DragDropModule,
    MatTooltipModule,
    ModalsModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatMenuModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatTableModule,
  ],
})
export class DashboardModule {}
