import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatepickerComponent} from './datepicker.component';

@NgModule({
  declarations: [DatepickerComponent],
  exports: [DatepickerComponent],
  imports: [
    CommonModule
  ]
})
export class DatepickerModule {
}
