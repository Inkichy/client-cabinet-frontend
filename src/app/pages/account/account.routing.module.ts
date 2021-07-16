import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { GuardAuthService } from '../../core/services/guard-auth.service';

const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
  {
    path: 'password-change',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('../password-change/password-change.module').then(m => m.PasswordChangeModule)
  },
  {
    path: 'password-change/password-change-form',
    canActivate: [GuardAuthService],
    loadChildren: () =>
      import('../password-change-form/password-change-form.module').then(m => m.PasswordChangeFormModule)
  },

];
@NgModule({
    imports: [RouterModule.forChild(accountRoutes)],
    exports: [RouterModule]
})
export class AccountRoutingModule {

}
