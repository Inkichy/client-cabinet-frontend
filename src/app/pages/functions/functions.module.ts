import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FunctionsComponent} from './functions.component';
import {TopPanelModule} from '../../ui/top-panel/top-panel.module';
import {LayoutModule} from '../../ui/layout/layout.module';
import {FunctionsRoutingModule} from './functions-routing.module';
import {FooterSlickModule} from '../../ui/footer-slick/footer-slick.module';
import { ModalsModule } from 'src/app/modals/modals.module';

@NgModule({
  declarations: [FunctionsComponent],
  imports: [
    CommonModule,
    TopPanelModule,
    LayoutModule,
    FunctionsRoutingModule,
    FooterSlickModule,
    ModalsModule
  ]
})
export class FunctionsModule { }
