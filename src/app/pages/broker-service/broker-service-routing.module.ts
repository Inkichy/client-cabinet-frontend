import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrokerServiceComponent } from './broker-service.component';

const routes: Routes = [
  {
    path: '',
    component: BrokerServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerServiceRoutingModule {}
