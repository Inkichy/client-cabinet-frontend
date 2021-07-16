import {NgModule} from '@angular/core';
import {ProductReportsComponent} from './poducts-reports.component';
import {SharedModule} from 'src/app/shared/share.module';
import {ProductsReportsRoutingModule} from './poducts-reports.routing.module';
import {ProductMenuModule} from 'src/app/ui/product-menu/product-menu.module';
import {ProductSliderModule} from 'src/app/ui/product-slider/product-slider.module';
import {BottomPortfolioBtnsModule} from '../../../ui/bottom-portfolio-btns/bottom-portfolio-btns.module';
import {TopPanelImageModule} from '../../../ui/top-panel-image/top-panel-image.module';
import {DatepickerModule} from 'src/app/ui/datepicker/datepicker.module';
import {DocumentsPageModule} from '../../documents-page/documents-page.module';
import {FooterSlickModule} from '../../../ui/footer-slick/footer-slick.module';

@NgModule({
    declarations: [ProductReportsComponent],
    imports: [
        SharedModule,
        ProductsReportsRoutingModule,
        ProductSliderModule,
        ProductMenuModule,
        BottomPortfolioBtnsModule,
        TopPanelImageModule,
        DatepickerModule,
        DocumentsPageModule,
        FooterSlickModule]
})
export class ProductReportsModule {

}
