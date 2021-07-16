import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPanelImageComponent } from './top-panel-image.component';

@NgModule({
  declarations: [TopPanelImageComponent],
  exports: [
    TopPanelImageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TopPanelImageModule { }
