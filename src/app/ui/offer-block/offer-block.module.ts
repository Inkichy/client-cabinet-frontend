import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferBlockComponent } from './offer-block.component';

@NgModule({
  declarations: [OfferBlockComponent],
  exports: [OfferBlockComponent],
  imports: [
    CommonModule
  ]
})
export class OfferBlockModule { }
