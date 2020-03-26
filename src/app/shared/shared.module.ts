import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './header/header.component';
import { PriorityPipe } from './priority.pipe';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [HeaderComponent, PriorityPipe, ProgressSpinnerComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [HeaderComponent, PriorityPipe, ProgressSpinnerComponent]
})
export class SharedModule {}
