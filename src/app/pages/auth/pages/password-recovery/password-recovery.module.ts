import {NgModule} from '@angular/core';
import {PasswordRecoveryComponent} from './password-recovery.component';
import {PasswordRecoveryRoutingModule} from './password-recovery-routing.module';
import {CommonModule} from '@angular/common';
import {AuthModalModule} from 'src/app/ui/auth-modal/auth-modal.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordChangeModule} from '../password-change/password-change.module';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    PasswordRecoveryComponent
  ],
  imports: [
    CommonModule,
    PasswordRecoveryRoutingModule,
    AuthModalModule,
    ReactiveFormsModule,
    PasswordChangeModule,
    NgxMaskModule
  ],
  exports: [
    PasswordRecoveryComponent
  ]
})
export class PasswordRecoveryModule {
}
