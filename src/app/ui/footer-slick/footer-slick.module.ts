import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterSlickComponent} from './footer-slick.component';
import {RouterModule} from '@angular/router';
import {SlickModule} from '../../directives/slick/slick.module';

@NgModule({
  declarations: [FooterSlickComponent],
  exports: [
    FooterSlickComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SlickModule
  ]
})
export class FooterSlickModule {}
