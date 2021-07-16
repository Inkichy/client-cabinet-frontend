import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TmPurchaseComponent} from './tm-purchase.component';

const routes: Routes = [
  {
    path: '',
    component: TmPurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TmPurchaseRoutingModule {
}
