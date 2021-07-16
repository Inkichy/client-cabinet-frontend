import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PasswordChangeFormComponent} from './password-change-form.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordChangeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordChangeFormRoutingModule {
}
