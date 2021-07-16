import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import {PaymentRoutingModule} from "./payment-routing.module";
import {LayoutModule} from "../../ui/layout/layout.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TopPanelModule} from '../../ui/top-panel/top-panel.module';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    TopPanelModule
  ]
})
export class PaymentModule { }
