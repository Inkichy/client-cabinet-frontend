import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WithdrawRequestComponent} from './withdraw-request.component';

const routes: Routes = [
  {
    path: '',
    component: WithdrawRequestComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawRequestRoutingModule { }
