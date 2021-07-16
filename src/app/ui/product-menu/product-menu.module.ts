import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductMenuComponent} from './product-menu.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [ProductMenuComponent],
  exports: [ProductMenuComponent],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ProductMenuModule {
}

