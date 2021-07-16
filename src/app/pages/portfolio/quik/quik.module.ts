import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuikComponent } from './quik.component';
import { QuikRoutingModule } from './quik-routing.module';
import { LayoutModule } from '../../../ui/layout/layout.module';
import { TopPanelModule } from '../../../ui/top-panel/top-panel.module';
import { TopPanelImageModule } from '../../../ui/top-panel-image/top-panel-image.module';
import {ProductMenuModule} from '../../../ui/product-menu/product-menu.module';
import { ProductSliderModule } from '../../../ui/product-slider/product-slider.module';

@NgModule({
  declarations: [QuikComponent],
  imports: [
    CommonModule,
    QuikRoutingModule,
    LayoutModule,
    TopPanelModule,
    TopPanelImageModule,
    ProductMenuModule,
    ProductSliderModule
  ]
})
export class QuikModule { }
