import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StructureOfIssuersByCurrencyComponent} from './structure-of-issuers-by-currency.component';
import {StructureOfIssuersByCurrencyDirective} from './structure-of-issuers-by-currency.directive';

@NgModule({
  declarations: [StructureOfIssuersByCurrencyComponent, StructureOfIssuersByCurrencyDirective],
  exports: [StructureOfIssuersByCurrencyComponent],
  imports: [
    CommonModule,
  ]
})
export class StructureOfIssuersByCurrencyModule {
}
