import {NgModule} from '@angular/core';
import {SignInComponent} from './sign-in.component';
import {SignInRoutingModule} from './sign-in-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [SignInComponent],
  imports: [SignInRoutingModule, ReactiveFormsModule, FormsModule, CommonModule, NgxMaskModule]
})
export class SignInModule {
}
