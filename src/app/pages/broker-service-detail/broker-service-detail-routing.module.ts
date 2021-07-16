import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrokerServiceDetailComponent } from './broker-service-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerServiceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerServiceDetailRoutingModule {}
