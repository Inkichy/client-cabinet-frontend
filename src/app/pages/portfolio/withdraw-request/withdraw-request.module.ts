import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WithdrawRequestComponent} from './withdraw-request.component';
import {LayoutModule} from '../../../ui/layout/layout.module';
import {TopPanelModule} from '../../../ui/top-panel/top-panel.module';
import {InvestModalModule} from '../../../ui/invest-modal/invest-modal.module';
import {ProductSliderModule} from '../../../ui/product-slider/product-slider.module';
import {WithdrawRequestRoutingModule} from './withdraw-request-routing.module';
import {ProductMenuModule} from '../../../ui/product-menu/product-menu.module';
import {FooterSlickModule} from '../../../ui/footer-slick/footer-slick.module';
import {BottomPortfolioBtnsModule} from '../../../ui/bottom-portfolio-btns/bottom-portfolio-btns.module';
import {TopPanelImageModule} from '../../../ui/top-panel-image/top-panel-image.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [WithdrawRequestComponent],
    imports: [
        CommonModule,
        LayoutModule,
        TopPanelModule,
        InvestModalModule,
        ProductSliderModule,
        WithdrawRequestRoutingModule,
        ProductMenuModule,
        FormsModule,
        ReactiveFormsModule,
        FooterSlickModule,
        BottomPortfolioBtnsModule,
        TopPanelImageModule,
        FooterSlickModule
    ]
})
export class WithdrawRequestModule {
}
