import {NgModule} from '@angular/core';
import {ProductsBlock2Component} from './products-block2.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [ProductsBlock2Component],
  exports: [ProductsBlock2Component]
})
export class ProductsBlock2Module {
}
