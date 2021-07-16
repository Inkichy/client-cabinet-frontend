import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortfolioStructureAndValueComponent} from './portfolio-structure-and-value.component';

@NgModule({
  declarations: [PortfolioStructureAndValueComponent],
  exports: [PortfolioStructureAndValueComponent],
  imports: [
    CommonModule
  ]
})
export class PortfolioStructureAndValueModule {
}
