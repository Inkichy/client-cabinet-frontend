import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AccountCustomerQuestionnaireComponent } from './account-customer-questionnaire.component';
let questionnaire: Routes = [{ path: '', component: AccountCustomerQuestionnaireComponent }]
@NgModule({
    imports: [RouterModule.forChild(questionnaire)],
    exports: [RouterModule]
})
export class AccountCustomerQuestionnaireRoutingModule {

}