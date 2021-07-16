import {NgModule} from '@angular/core';
import {ProductCardComponent} from './product-card.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [CommonModule, RouterModule],
  declarations: [ProductCardComponent],
  exports: [ProductCardComponent]
})
export class ProductCardModule {
}
