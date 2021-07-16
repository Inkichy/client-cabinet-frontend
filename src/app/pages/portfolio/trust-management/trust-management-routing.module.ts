import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TrustManagementComponent} from './trust-management.component';

const routes: Routes = [
  {
    path: '',
    component: TrustManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrustManagementRoutingModule {
}
