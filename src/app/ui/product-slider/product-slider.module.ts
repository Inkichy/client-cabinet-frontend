import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductSliderComponent} from './product-slider.component';
import {SlickModule} from '../../directives/slick/slick.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ProductSliderComponent],
  exports: [ProductSliderComponent],
  imports: [
    CommonModule,
    SlickModule,
    RouterModule
  ]
})
export class ProductSliderModule {
}
