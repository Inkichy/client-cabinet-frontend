import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '../../ui/layout/layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TmPurchaseStepTwoComponent} from './tm-purchase-step-two.component';
import {TmPurchaseStepTwoRoutingModule} from './tm-purchase-step-two-routing.module';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    TmPurchaseStepTwoRoutingModule,
    NgxMaskModule.forChild(),
  ],
  exports: [TmPurchaseStepTwoComponent],
  declarations: [
    TmPurchaseStepTwoComponent
  ],
})
export class TmPurchaseStepTwoModule {
}
