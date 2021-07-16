import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwaggerComponent } from './swagger.component';

@NgModule({
  declarations: [SwaggerComponent],
  imports: [
    CommonModule
  ],
  exports: [SwaggerComponent]
})
export class SwaggerModule { }
