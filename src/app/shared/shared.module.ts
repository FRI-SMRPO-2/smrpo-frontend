import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './header/header.component';
import { PriorityPipe } from './priority.pipe';

@NgModule({
  declarations: [HeaderComponent, PriorityPipe],
  imports: [CommonModule, MatMenuModule, MatTooltipModule],
  exports: [HeaderComponent, PriorityPipe]
})
export class SharedModule {}
