import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import {PaymentDetailsComponent} from "./payment-details.component";
const paymentDetailsRoutes: Routes = [{ path: '', component: PaymentDetailsComponent }];

@NgModule({
    imports: [RouterModule.forChild(paymentDetailsRoutes)],
    exports: [RouterModule]
})
export class PaymentDetailsRoutingModule {

}