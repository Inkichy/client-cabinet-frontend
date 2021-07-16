import {NgModule} from '@angular/core';
import {AnalyticsComponent} from './analytics.component';
import {SlickModule} from '../../directives/slick/slick.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [SlickModule, CommonModule],
  declarations: [AnalyticsComponent],
  exports: [AnalyticsComponent]
})
export class AnalyticsModule {
}
