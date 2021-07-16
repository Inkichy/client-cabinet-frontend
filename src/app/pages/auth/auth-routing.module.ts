import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./pages/sign-in/sign-in.module').then(m => m.SignInModule)
      },
      {
        path: 'sign-up',
        redirectTo: 'sign-in'
        // loadChildren: () =>
        //   import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)
      },
      {
        path: 'password-recovery',
        loadChildren: () =>
          import('./pages/password-recovery/password-recovery.module').then(
            m => m.PasswordRecoveryModule
          )
      },
      {
        path: 'password-change',
        loadChildren: () =>
          import('./pages/password-change/password-change.module').then(m => m.PasswordChangeModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
