import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioComponent} from './portfolio.component';
import {PortfolioRoutingModule} from './portfolio-routing.module';
import {LayoutModule} from '../../ui/layout/layout.module';
import {ShortnumberPipe} from '../../core/pipes/shortnumber.pipe';
import {SlickModule} from '../../directives/slick/slick.module';
import {FooterSlickModule} from '../../ui/footer-slick/footer-slick.module';
import {RouterModule} from '@angular/router';
import {ProductSliderModule} from '../../ui/product-slider/product-slider.module';
import { QuikModule } from './quik/quik.module';

@NgModule({
    declarations: [PortfolioComponent, ShortnumberPipe],
    imports: [
        LayoutModule,
        CommonModule,
        PortfolioRoutingModule,
        SlickModule,
        RouterModule,
        FooterSlickModule,
        ProductSliderModule,
        QuikModule
],
    exports: [
        ShortnumberPipe
    ]
})
export class PortfolioModule {
}
