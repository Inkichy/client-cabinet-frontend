import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustManagementDetailComponent } from './trust-management-detail.component';
import {LayoutModule} from '../../ui/layout/layout.module';
import {TrustManagementDetailRoutingModule} from './trust-management-detail-routing.module';
import {TopPanelModule} from '../../ui/top-panel/top-panel.module';
import { AuthModalModule } from '../../ui/auth-modal/auth-modal.module';

@NgModule({
  declarations: [TrustManagementDetailComponent],
  imports: [
    CommonModule,
    TrustManagementDetailRoutingModule,
    LayoutModule,
    TopPanelModule,
    AuthModalModule
  ]
})
export class TrustManagementDetailModule { }
