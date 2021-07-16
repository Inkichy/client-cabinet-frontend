import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfitabilityChartForThePeriodComponent} from './profitability-chart-for-the-period.component';
import {DatepickerModule} from '../../datepicker/datepicker.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProfitabilityChartForThePeriodComponent],
  exports: [ProfitabilityChartForThePeriodComponent],
  imports: [
    CommonModule,
    DatepickerModule,
    FormsModule
  ]
})
export class ProfitabilityChartForThePeriodModule {
}
