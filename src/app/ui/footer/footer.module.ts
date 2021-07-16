import { NgModule } from '@angular/core';
import { FooterComponent } from './footer.component';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [FooterComponent]
})
export class FooterModule {}
