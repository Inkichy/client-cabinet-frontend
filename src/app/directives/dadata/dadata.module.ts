import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DadataDirective} from './dadata.directive';

@NgModule({
  declarations: [DadataDirective],
  exports: [DadataDirective],
  imports: [
    CommonModule
  ]
})
export class DadataModule {
}
