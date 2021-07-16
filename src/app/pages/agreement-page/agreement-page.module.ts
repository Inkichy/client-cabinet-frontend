import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgreementPageRoutingModule } from './agreement-page-routing.module';
import { AgreementPageComponent } from './agreement-page.component';
import { PreloaderModule } from 'src/app/ui/preloader/preloader.module';
import { FooterAuthModule } from 'src/app/ui/footer-auth/footer-auth.module';
import { HeaderAuthModule } from 'src/app/ui/header-auth/header-auth.module';
import { HeaderEntranceMobileModule } from 'src/app/ui/header-entrance-mobile/header-entrance-mobile.module';
import { HeaderMobileModule } from 'src/app/ui/header-mobile/header-mobile.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [AgreementPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgreementPageRoutingModule,
    HeaderMobileModule,
    HeaderEntranceMobileModule,
    HeaderAuthModule,
    FooterAuthModule,
    CommonModule,
    PreloaderModule,
    NgxMaskModule
  ]
})
export class AgreementPageModule { }
