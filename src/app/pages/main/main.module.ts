import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { InvestModalModule } from 'src/app/ui/invest-modal/invest-modal.module';
import { AuthModalModule } from 'src/app/ui/auth-modal/auth-modal.module';
import { LayoutModule } from '../../ui/layout/layout.module';
import { TopPanelModule } from '../../ui/top-panel/top-panel.module';
import { CommonModule } from '@angular/common';
import { ProductsBlockModule } from 'src/app/ui/products-block/products-block.module';
import { AnalyticsModule } from 'src/app/ui/analytics/analytics.module';
import { ProductsBlock2Module } from 'src/app/ui/products-block2/products-block2.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    LayoutModule,
    TopPanelModule,
    MainRoutingModule,
    InvestModalModule,
    ProductsBlockModule,
    ProductsBlock2Module,
    AnalyticsModule,
    AuthModalModule
  ]
})
export class MainModule {
}
