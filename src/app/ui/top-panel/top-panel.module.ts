import { NgModule } from '@angular/core';
import { TopPanelComponent } from './top-panel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TopPanelComponent],
  exports: [TopPanelComponent],
  imports: [CommonModule]
})
export class TopPanelModule {}
