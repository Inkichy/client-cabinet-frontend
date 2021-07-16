import { NgModule } from '@angular/core';
import { InvestModalComponent } from './invest-modal.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [InvestModalComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
    exports: [InvestModalComponent]
})
export class InvestModalModule {}
