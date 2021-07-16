import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrustManagementComponent} from './trust-management.component';
import {LayoutModule} from '../../../ui/layout/layout.module';
import {TrustManagementRoutingModule} from './trust-management-routing.module';
import {ProductSliderModule} from '../../../ui/product-slider/product-slider.module';
import {OfferBlockModule} from '../../../ui/offer-block/offer-block.module';
import {StructureOfIssuersByCurrencyModule} from '../../../ui/charts/structure-of-issuers-by-currency/structure-of-issuers-by-currency.module';
import {PortfolioStructureAndValueModule} from '../../../ui/charts/portfolio-structure-and-value/portfolio-structure-and-value.module';
import {BalanceSheetForThePeriodAmountModule} from '../../../ui/charts/balance-sheet-for-the-period-amount/balance-sheet-for-the-period-amount.module';
import {ProductMenuModule} from '../../../ui/product-menu/product-menu.module';
import {FooterSlickModule} from '../../../ui/footer-slick/footer-slick.module';
import {ProfitabilityChartForThePeriodModule} from '../../../ui/charts/profitability-chart-for-the-period/profitability-chart-for-the-period.module';
import {BottomPortfolioBtnsModule} from '../../../ui/bottom-portfolio-btns/bottom-portfolio-btns.module';
import {TopPanelModule} from '../../../ui/top-panel/top-panel.module';

@NgModule({
  declarations: [TrustManagementComponent],
  imports: [
    LayoutModule,
    CommonModule,
    TrustManagementRoutingModule,
    ProductSliderModule,
    OfferBlockModule,
    StructureOfIssuersByCurrencyModule,
    PortfolioStructureAndValueModule,
    BalanceSheetForThePeriodAmountModule,
    ProductMenuModule,
    FooterSlickModule,
    ProfitabilityChartForThePeriodModule,
    BottomPortfolioBtnsModule,
    TopPanelModule
  ]
})
export class TrustManagementModule {
}
