import { NgModule } from '@angular/core';
import { SignedContractsComponent } from './signed-contracts.component';
import { SharedModule } from 'src/app/shared/share.module';
import { SignedContractsRoutingModule } from './signed-contracts.routing.module';
import { ProductSliderModule } from 'src/app/ui/product-slider/product-slider.module';
import { ProductMenuModule } from 'src/app/ui/product-menu/product-menu.module';
import { BottomPortfolioBtnsModule } from '../../../ui/bottom-portfolio-btns/bottom-portfolio-btns.module';
import { TopPanelImageModule } from '../../../ui/top-panel-image/top-panel-image.module';

@NgModule({
  declarations: [SignedContractsComponent],
  imports: [
    SharedModule,
    SignedContractsRoutingModule,
    ProductSliderModule,
    ProductMenuModule,
    BottomPortfolioBtnsModule,
    TopPanelImageModule
  ]
})
export class SignedContractModule {

}
