import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import {LayoutModule} from '../../ui/layout/layout.module';
import {CatalogRoutingModule} from './catalog.routing.module';
import {ProductCardBrokerModule} from '../../ui/product-card-broker/product-card-broker.module';
import {ProductCardModule} from '../../ui/product-card/product-card.module';
import {TopPanelModule} from '../../ui/top-panel/top-panel.module';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    LayoutModule,
    CatalogRoutingModule,
    ProductCardBrokerModule,
    ProductCardModule,
    TopPanelModule
  ]
})
export class CatalogModule { }
