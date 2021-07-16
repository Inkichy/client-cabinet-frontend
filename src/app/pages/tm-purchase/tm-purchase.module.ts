import {NgModule} from '@angular/core';
import {TmPurchaseComponent} from './tm-purchase.component';
import {TmPurchaseRoutingModule} from './tm-purchase-routing.module';
import {NgxMaskModule} from 'ngx-mask';
import {DadataModule} from '../../directives/dadata/dadata.module';
import { SharedModule } from 'src/app/shared/share.module';

@NgModule({
  imports: [
    TmPurchaseRoutingModule,
    DadataModule,
    NgxMaskModule.forChild(),
    SharedModule
  ],
  declarations: [
    TmPurchaseComponent,
  ],
  exports: [TmPurchaseComponent]
})
export class TmPurchaseModule {
}
