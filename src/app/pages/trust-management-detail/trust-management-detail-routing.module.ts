import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TrustManagementDetailComponent} from './trust-management-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TrustManagementDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrustManagementDetailRoutingModule {
}
