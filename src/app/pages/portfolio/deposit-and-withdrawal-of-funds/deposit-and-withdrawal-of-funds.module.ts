import { NgModule } from '@angular/core';
import { DepositAndWithdrawalOfFundsComponent } from './deposit-and-withdrawal-of-funds.component';
import { DepositAndWithdrawalOfFundsRoutingModule } from './deposit-and-withdrawal-of-funds.routing.module';
import { SharedModule } from 'src/app/shared/share.module';
import { ProductSliderModule } from 'src/app/ui/product-slider/product-slider.module';
import { ProductMenuModule } from 'src/app/ui/product-menu/product-menu.module';
import { DatepickerModule } from 'src/app/ui/datepicker/datepicker.module';
import { BottomPortfolioBtnsModule } from '../../../ui/bottom-portfolio-btns/bottom-portfolio-btns.module';
import { TopPanelImageModule } from '../../../ui/top-panel-image/top-panel-image.module';
import {FooterSlickModule} from '../../../ui/footer-slick/footer-slick.module';

@NgModule({
  declarations: [DepositAndWithdrawalOfFundsComponent],
  imports: [
    DepositAndWithdrawalOfFundsRoutingModule,
    DatepickerModule,
    SharedModule,
    ProductSliderModule,
    ProductMenuModule,
    BottomPortfolioBtnsModule,
    TopPanelImageModule,
    FooterSlickModule]
})
export class DepositAndWithdrawalOfFundsModule {

}
