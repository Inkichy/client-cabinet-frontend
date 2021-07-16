import {NgModule} from '@angular/core';
import {BrokerServiceDetailComponent} from './broker-service-detail.component';
import {LayoutModule} from 'src/app/ui/layout/layout.module';
import {BrokerServiceDetailRoutingModule} from './broker-service-detail-routing.module';
import {TopPanelModule} from 'src/app/ui/top-panel/top-panel.module';
import {ProductCardModule} from 'src/app/ui/product-card/product-card.module';
import {CommonModule} from '@angular/common';
import {ProductsBlockWideSliderModule} from 'src/app/ui/products-block-wide-slider/products-block-wide-slider.module';
import {AuthModalModule} from '../../ui/auth-modal/auth-modal.module';
import {ProductSliderModule} from '../../ui/product-slider/product-slider.module';

@NgModule({
    declarations: [BrokerServiceDetailComponent],
    imports: [
        CommonModule,
        LayoutModule,
        BrokerServiceDetailRoutingModule,
        TopPanelModule,
        ProductsBlockWideSliderModule,
        ProductCardModule,
        AuthModalModule,
        ProductSliderModule
    ],
    exports: [BrokerServiceDetailComponent]
})
export class BrokerServiceDetailModule {
}
