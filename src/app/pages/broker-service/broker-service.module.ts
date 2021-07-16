import {NgModule} from '@angular/core';
import {BrokerServiceComponent} from './broker-service.component';
import {LayoutModule} from 'src/app/ui/layout/layout.module';
import {BrokerServiceRoutingModule} from './broker-service-routing.module';
import {TopPanelModule} from 'src/app/ui/top-panel/top-panel.module';
import {ProductCardModule} from 'src/app/ui/product-card/product-card.module';
import {CommonModule} from '@angular/common';
import {ProductsBlockWideSliderModule} from 'src/app/ui/products-block-wide-slider/products-block-wide-slider.module';
import {InvestModalModule} from "../../ui/invest-modal/invest-modal.module";
import {ProductCardBrokerModule} from '../../ui/product-card-broker/product-card-broker.module';

@NgModule({
  declarations: [BrokerServiceComponent],
  imports: [
    CommonModule,
    LayoutModule,
    BrokerServiceRoutingModule,
    TopPanelModule,
    ProductsBlockWideSliderModule,
    ProductCardModule,
    InvestModalModule,
    ProductCardBrokerModule
  ],
  exports: []
})
export class BrokerServiceModule {
}
