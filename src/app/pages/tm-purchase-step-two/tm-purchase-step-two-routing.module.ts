import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TmPurchaseStepTwoComponent} from './tm-purchase-step-two.component';

const routes: Routes = [
  {
    path: '',
    component: TmPurchaseStepTwoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TmPurchaseStepTwoRoutingModule {
}
