import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { AuthModalModule } from 'src/app/ui/auth-modal/auth-modal.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    NgxMaskModule.forChild(),
    ReactiveFormsModule,
    CommonModule,
    SignUpRoutingModule,
    AuthModalModule
  ],
  exports: [SignUpComponent]
})
export class SignUpModule {
}
