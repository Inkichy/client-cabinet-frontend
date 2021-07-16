import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HeaderMobileModule } from 'src/app/ui/header-mobile/header-mobile.module';
import { HeaderEntranceMobileModule } from 'src/app/ui/header-entrance-mobile/header-entrance-mobile.module';
import { HeaderAuthModule } from 'src/app/ui/header-auth/header-auth.module';
import { FooterAuthModule } from 'src/app/ui/footer-auth/footer-auth.module';
import { SidebarAuthModule } from 'src/app/ui/sidebar-auth/sidebar-auth.module';
import { CommonModule } from '@angular/common';
import { PreloaderModule } from 'src/app/ui/preloader/preloader.module';

@NgModule({
  declarations: [AuthComponent],
  exports: [AuthComponent],
  imports: [
    AuthRoutingModule,
    HeaderMobileModule,
    HeaderEntranceMobileModule,
    HeaderAuthModule,
    FooterAuthModule,
    SidebarAuthModule,
    CommonModule,
    PreloaderModule
  ]
})
export class AuthModule {}
