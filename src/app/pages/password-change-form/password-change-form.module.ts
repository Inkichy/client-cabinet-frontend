import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChangeFormComponent } from './password-change-form.component';
import {LayoutModule} from '../../ui/layout/layout.module';
import {RouterModule} from '@angular/router';
import {PasswordChangeFormRoutingModule} from './password-change-form-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordRecoveryModule} from '../auth/pages/password-recovery/password-recovery.module';
import {PasswordChangeModule} from '../auth/pages/password-change/password-change.module';

@NgModule({
  declarations: [PasswordChangeFormComponent],
  imports: [
    CommonModule,
    LayoutModule,
    PasswordChangeFormRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    PasswordRecoveryModule,
    PasswordChangeModule
  ]
})
export class PasswordChangeFormModule { }
