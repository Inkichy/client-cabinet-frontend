import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuikComponent} from './quik.component';

const routes: Routes = [
  {
    path: '',
    component: QuikComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuikRoutingModule {
}
