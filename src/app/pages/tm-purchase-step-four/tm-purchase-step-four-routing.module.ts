import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TmPurchaseStepFourComponent} from './tm-purchase-step-four.component';

const routes: Routes = [
  {
    path: '',
    component: TmPurchaseStepFourComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TmPurchaseStepFourRoutingModule {
}
