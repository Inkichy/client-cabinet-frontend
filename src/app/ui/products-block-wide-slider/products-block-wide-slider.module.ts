import {NgModule} from '@angular/core';
import {ProductsBlockWideSliderComponent} from './products-block-wide-slider.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SlickModule} from 'src/app/directives/slick/slick.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SlickModule
  ],
  declarations: [ProductsBlockWideSliderComponent],
  exports: [ProductsBlockWideSliderComponent]
})
export class ProductsBlockWideSliderModule {
}
