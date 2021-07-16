import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OnlineRequestRoutingModule} from "./online-request-routing.module";
import {OnlineRequestComponent} from "./online-request.component";
import {LayoutModule} from "../../ui/layout/layout.module";
import {ProductMenuModule} from '../../ui/product-menu/product-menu.module';
import {TopPanelModule} from '../../ui/top-panel/top-panel.module';
import {ProductSliderModule} from '../../ui/product-slider/product-slider.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgxMaskModule } from 'ngx-mask';
import { ModalsModule } from 'src/app/modals/modals.module';
import { FunctionPipe } from 'src/app/core/pipes/function.pipe';

@NgModule({
  declarations: [OnlineRequestComponent, FunctionPipe],
  imports: [
    CommonModule,
    OnlineRequestRoutingModule,
    LayoutModule,
    ProductMenuModule,
    TopPanelModule,
    ProductSliderModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule,
    ModalsModule
  ],
  exports: [FunctionPipe]
})
export class OnlineRequestModule { }
