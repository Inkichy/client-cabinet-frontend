import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentDetailsRoutingModule} from "./payment-details.routing.module";
import {PaymentDetailsComponent} from "./payment-details.component";
import {LayoutModule} from "../../ui/layout/layout.module";
import {AuthModalModule} from '../../ui/auth-modal/auth-modal.module';

@NgModule({
  declarations: [PaymentDetailsComponent],
  imports: [
    CommonModule,
    PaymentDetailsRoutingModule,
    LayoutModule,
    AuthModalModule
  ]
})
export class PaymentDetailsModule { }
