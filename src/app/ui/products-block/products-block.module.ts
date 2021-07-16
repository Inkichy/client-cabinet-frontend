import {NgModule} from '@angular/core';
import {ProductsBlockComponent} from './products-block.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProductsBlockComponent],
  exports: [ProductsBlockComponent]
})
export class ProductsBlockModule {
}
