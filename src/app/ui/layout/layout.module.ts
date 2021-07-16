import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout.component';
import {HeaderModule} from '../header/header.module';
import {FooterModule} from '../footer/footer.module';
import {HeaderMobileModule} from '../header-mobile/header-mobile.module';
import {SidebarModule} from '../sidebar/sidebar.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    HeaderMobileModule,
    SidebarModule,
  ],
  exports: [LayoutComponent]
})
export class LayoutModule {
}
