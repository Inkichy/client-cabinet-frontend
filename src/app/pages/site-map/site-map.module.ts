import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteMapComponent } from './site-map.component';
import { SiteMapRoutingModule } from './site-map-routing.module';
import {LayoutModule} from '../../ui/layout/layout.module';
import {TopPanelModule} from '../../ui/top-panel/top-panel.module';
import {ProductSliderModule} from '../../ui/product-slider/product-slider.module';
import {FooterSlickModule} from '../../ui/footer-slick/footer-slick.module';
import { ModalsModule } from 'src/app/modals/modals.module';

@NgModule({
  declarations: [SiteMapComponent],
  imports: [
    CommonModule,
    SiteMapRoutingModule,
    LayoutModule,
    TopPanelModule,
    ProductSliderModule,
    FooterSlickModule,
    ModalsModule
  ],
  entryComponents: [],
})
export class SiteMapModule { }
