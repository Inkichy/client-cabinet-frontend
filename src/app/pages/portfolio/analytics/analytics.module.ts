import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnalyticsComponent} from './analytics.component';
import {AnalyticsRoutingModule} from './analytics-routing.module';
import {TopPanelModule} from '../../../ui/top-panel/top-panel.module';
import {InvestModalModule} from '../../../ui/invest-modal/invest-modal.module';
import {ProductMenuModule} from '../../../ui/product-menu/product-menu.module';
import {BottomPortfolioBtnsModule} from '../../../ui/bottom-portfolio-btns/bottom-portfolio-btns.module';
import {ProductSliderModule} from '../../../ui/product-slider/product-slider.module';
import {LayoutModule} from '../../../ui/layout/layout.module';
import {TopPanelImageModule} from '../../../ui/top-panel-image/top-panel-image.module';
import {DocumentsPageModule} from '../../documents-page/documents-page.module';
import {FooterSlickModule} from '../../../ui/footer-slick/footer-slick.module';

@NgModule({
    declarations: [AnalyticsComponent],
    imports: [
        CommonModule,
        AnalyticsRoutingModule,
        TopPanelModule,
        InvestModalModule,
        ProductMenuModule,
        BottomPortfolioBtnsModule,
        ProductSliderModule,
        LayoutModule,
        TopPanelImageModule,
        DocumentsPageModule,
        FooterSlickModule
    ]
})
export class AnalyticsModule {
}
