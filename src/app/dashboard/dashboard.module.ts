import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { TaskCardComponent } from './project/task-card/task-card.component';
import { ModalsModule } from '../modals/modals.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    ProjectComponent,
    HomeComponent,
    DashboardComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    DragDropModule,
    MatTooltipModule,
    SharedModule,
    ModalsModule,
    MatExpansionModule
  ]
})
export class DashboardModule {}
