import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordChangeComponent} from './password-change.component';
import {PasswordChangeRoutingModule} from './password-change-routing.module';
import {LayoutModule} from '../../ui/layout/layout.module';

@NgModule({
  declarations: [PasswordChangeComponent],
  imports: [
    CommonModule,
    PasswordChangeRoutingModule,
    LayoutModule
  ]
})

export class PasswordChangeModule { }
