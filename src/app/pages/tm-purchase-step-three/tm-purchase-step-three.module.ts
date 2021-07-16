import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '../../ui/layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TmPurchaseStepThreeRoutingModule} from './tm-purchase-step-three-routing.module';
import {TmPurchaseStepThreeComponent} from './tm-purchase-step-three.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    TmPurchaseStepThreeRoutingModule,
  ],
  exports: [TmPurchaseStepThreeComponent],
  declarations: [
    TmPurchaseStepThreeComponent
  ],
})
export class TmPurchaseStepThreeModule {
}
