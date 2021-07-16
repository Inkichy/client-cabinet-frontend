import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { InvestmentProfileComponent } from './investment-profile.component';
let investmentProfileRoutes: Routes = [{ path: '', component: InvestmentProfileComponent }]
@NgModule({
    imports: [RouterModule.forChild(investmentProfileRoutes)],
    exports: [RouterModule]
})
export class InvestmentPorofileRoutingModule {

}