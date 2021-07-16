import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordChangeComponent} from './password-change.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PasswordChangeRoutingModule} from './password-change-routing.module';

@NgModule({
  declarations: [
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    PasswordChangeRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    PasswordChangeComponent
  ]
})
export class PasswordChangeModule {
}
