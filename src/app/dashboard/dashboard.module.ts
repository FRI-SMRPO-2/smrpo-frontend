import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

import { ModalsModule } from '../modals/modals.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProductBacklogComponent } from './project/product-backlog/product-backlog.component';
import { ProjectComponent } from './project/project.component';
import { SprintBacklogComponent } from './project/sprint-backlog/sprint-backlog.component';
import { SprintPanelComponent } from './project/sprint-panel/sprint-panel.component';
import { TaskCardComponent } from './project/task-card/task-card.component';
import { SprintStoryComponent } from './project/sprint-backlog/sprint-story/sprint-story.component';
import { MatIconModule } from '@angular/material/icon';
import { StoryTaskComponent } from './project/sprint-backlog/sprint-story/story-task/story-task.component';

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
    StoryTaskComponent
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
    MatIconModule
  ],
})
export class DashboardModule {}
