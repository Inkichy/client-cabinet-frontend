import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlickDirective, SlickNextDirective, SlickPrevDirective} from './slick.directive';

@NgModule({
  declarations: [SlickDirective, SlickPrevDirective, SlickNextDirective],
  exports: [SlickDirective, SlickPrevDirective, SlickNextDirective],
  imports: [
    CommonModule
  ]
})
export class SlickModule {
}
