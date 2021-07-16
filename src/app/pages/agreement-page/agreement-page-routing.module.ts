import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgreementPageComponent } from './agreement-page.component';

const routes: Routes = [
  {
    path: '',
    component: AgreementPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgreementPageRoutingModule { }
