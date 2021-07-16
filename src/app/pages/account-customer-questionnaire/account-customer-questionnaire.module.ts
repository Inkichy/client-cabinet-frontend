import { NgModule } from "@angular/core";
import { AccountCustomerQuestionnaireComponent } from './account-customer-questionnaire.component';
import { AccountCustomerQuestionnaireRoutingModule } from './account-customer-questionnaire.routing.modue';
import { SharedModule } from 'src/app/shared/share.module';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
    declarations: [AccountCustomerQuestionnaireComponent,],
    imports: [AccountCustomerQuestionnaireRoutingModule, SharedModule],
    providers:[ScrollToService]
})
export class AccountCustomerQuestionnaireModule {

}