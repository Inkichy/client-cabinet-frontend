import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TmPurchaseStepThreeComponent} from './tm-purchase-step-three.component';

const routes: Routes = [
  {
    path: '',
    component: TmPurchaseStepThreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TmPurchaseStepThreeRoutingModule {
}
