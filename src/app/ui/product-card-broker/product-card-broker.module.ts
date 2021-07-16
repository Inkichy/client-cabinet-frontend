import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardBrokerComponent } from './product-card-broker.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ProductCardBrokerComponent],
  exports: [
    ProductCardBrokerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ProductCardBrokerModule { }
