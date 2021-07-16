import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NoticesRoutingModule} from './notices-routing.module';
import {NoticesComponent} from './notices.component';
import {LayoutModule} from "../../ui/layout/layout.module";
import {FooterSlickModule} from '../../ui/footer-slick/footer-slick.module';
import {TopPanelModule} from '../../ui/top-panel/top-panel.module';
import { ModalsModule } from 'src/app/modals/modals.module';

@NgModule({
  declarations: [NoticesComponent],
  imports: [
    CommonModule,
    NoticesRoutingModule,
    LayoutModule,
    FooterSlickModule,
    TopPanelModule,
    ModalsModule
  ]
})
export class NoticesModule { }
