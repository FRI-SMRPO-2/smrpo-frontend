import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ModalsModule } from '../modals/modals.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductBacklogComponent } from './project/product-backlog/product-backlog.component';
import { ProjectComponent } from './project/project.component';
import { SprintBacklogComponent } from './project/sprint-backlog/sprint-backlog.component';
import { SprintStoryComponent } from './project/sprint-backlog/sprint-story/sprint-story.component';
import { StoryTaskComponent } from './project/sprint-backlog/sprint-story/story-task/story-task.component';
import { SprintPanelComponent } from './project/sprint-panel/sprint-panel.component';
import { TaskCardComponent } from './project/task-card/task-card.component';

@NgModule({
  declarations: [
    ProjectComponent,
    HomeComponent,
    DashboardComponent,
    TaskCardComponent,
    SprintPanelComponent,
    ProductBacklogComponent,
    SprintBacklogComponent,
    SprintStoryComponent,
    StoryTaskComponent,
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
  ],
})
export class DashboardModule {}
