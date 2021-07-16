import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome.component';
import {FooterSlickModule} from '../../ui/footer-slick/footer-slick.module';
import {LayoutModule} from '../../ui/layout/layout.module';
import {TopPanelModule} from '../../ui/top-panel/top-panel.module';
import {InvestModalModule} from '../../ui/invest-modal/invest-modal.module';
import {RouterModule} from '@angular/router';
import {WelcomeRoutingModule} from './welcome-routing.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    FooterSlickModule,
    WelcomeRoutingModule,
    LayoutModule,
    TopPanelModule,
    InvestModalModule,
    RouterModule
  ]
})
export class WelcomeModule { }
