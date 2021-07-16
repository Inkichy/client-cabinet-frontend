import {NgModule} from '@angular/core';
import {TrustManagementComponent} from './trust-management.component';
import {LayoutModule} from 'src/app/ui/layout/layout.module';
import {TrustManagementRoutingModule} from './trust-management-routing.module';
import {TopPanelModule} from 'src/app/ui/top-panel/top-panel.module';
import {TrustManagementFilterModule} from './components/trust-management-filter/trust-management-filter.module';
import {ProductCardModule} from 'src/app/ui/product-card/product-card.module';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [TrustManagementComponent],
  imports: [
    CommonModule,
    LayoutModule,
    TrustManagementRoutingModule,
    TopPanelModule,
    TrustManagementFilterModule,
    ProductCardModule
  ],
  exports: [TrustManagementComponent]
})
export class TrustManagementModule {
}
