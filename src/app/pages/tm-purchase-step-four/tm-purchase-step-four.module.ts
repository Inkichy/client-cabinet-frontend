import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '../../ui/layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TmPurchaseStepFourRoutingModule} from './tm-purchase-step-four-routing.module';
import {TmPurchaseStepFourComponent} from './tm-purchase-step-four.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    TmPurchaseStepFourRoutingModule,
  ],
  exports: [TmPurchaseStepFourComponent],
  declarations: [
    TmPurchaseStepFourComponent
  ],
})
export class TmPurchaseStepFourModule {
}
