import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OnlineRequestComponent} from "./online-request.component";

const routes: Routes = [
  {
    path: '',
    component: OnlineRequestComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnlineRequestRoutingModule { }
