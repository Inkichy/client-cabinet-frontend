import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomPortfolioBtnsComponent } from './bottom-portfolio-btns.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [BottomPortfolioBtnsComponent],
  exports: [
    BottomPortfolioBtnsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BottomPortfolioBtnsModule { }
