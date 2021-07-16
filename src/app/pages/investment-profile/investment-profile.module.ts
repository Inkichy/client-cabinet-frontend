import { NgModule } from "@angular/core";
import { InvestmentProfileComponent } from './investment-profile.component';
import { InvestmentPorofileRoutingModule } from './investment-profile.routing.module';
import { SharedModule } from 'src/app/shared/share.module';

@NgModule({
declarations:[InvestmentProfileComponent],
imports:[InvestmentPorofileRoutingModule,SharedModule]
})
export class InvestProfileModule{

}