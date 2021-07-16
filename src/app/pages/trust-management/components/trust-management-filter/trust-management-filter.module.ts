import {NgModule} from '@angular/core';
import {TrustManagementFilterComponent} from './trust-management-filter.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TrustManagementFilterComponent],
  exports: [TrustManagementFilterComponent]
})
export class TrustManagementFilterModule {
}
