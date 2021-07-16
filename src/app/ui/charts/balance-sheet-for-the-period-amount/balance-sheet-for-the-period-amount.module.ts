import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BalanceSheetForThePeriodAmountComponent} from './balance-sheet-for-the-period-amount.component';
import {FormsModule} from '@angular/forms';
import {DatepickerModule} from '../../datepicker/datepicker.module';

@NgModule({
  declarations: [BalanceSheetForThePeriodAmountComponent],
  exports: [BalanceSheetForThePeriodAmountComponent],
  imports: [
    CommonModule,
    DatepickerModule,
    FormsModule
  ]
})
export class BalanceSheetForThePeriodAmountModule {
}
