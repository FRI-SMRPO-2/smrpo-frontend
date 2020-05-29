import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './header/header.component';
import { PriorityPipe } from './priority.pipe';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { SprintDatePipe } from './sprintDate.pipe';
import { SprintSpeedPipe } from './sprintSpeed.pipe';

@NgModule({
  declarations: [HeaderComponent, PriorityPipe, ProgressSpinnerComponent, SprintDatePipe, SprintSpeedPipe],
  imports: [
    CommonModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  exports: [HeaderComponent, PriorityPipe, ProgressSpinnerComponent, SprintDatePipe, SprintSpeedPipe]
})
export class SharedModule {}
