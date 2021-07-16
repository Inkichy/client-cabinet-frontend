import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositAndWithdrawalOfFundsComponent } from './deposit-and-withdrawal-of-funds.component';
const fundsRoutes: Routes = [{ path: '', component: DepositAndWithdrawalOfFundsComponent }];
@NgModule({
    imports: [RouterModule.forChild(fundsRoutes)],
    exports: [RouterModule]
})
export class DepositAndWithdrawalOfFundsRoutingModule {

}
