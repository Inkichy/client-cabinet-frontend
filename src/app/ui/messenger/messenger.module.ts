import { NgModule } from '@angular/core';
import { MessengerComponent } from './messenger.component';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  declarations: [MessengerComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule
  ],
  exports: [MessengerComponent]
})
export class MessengerModule {}
