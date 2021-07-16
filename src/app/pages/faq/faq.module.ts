import { NgModule } from '@angular/core';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq.routing.module';
import { SharedModule } from 'src/app/shared/share.module';
import {FooterSlickModule} from '../../ui/footer-slick/footer-slick.module';

@NgModule({
    declarations: [FaqComponent],
  imports: [FaqRoutingModule, SharedModule, FooterSlickModule]
})
export class FaqModule { }
