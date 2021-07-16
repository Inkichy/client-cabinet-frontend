import { NgModule } from '@angular/core';
import { SelectProductComponent } from './select-product.component';
import { SelectProductRoutingModule } from './select-product.routing.module';
import { SharedModule } from 'src/app/shared/share.module';
import { ProductCardModule } from 'src/app/ui/product-card/product-card.module';

@NgModule({
    declarations: [SelectProductComponent],
    imports: [
        SelectProductRoutingModule,
        SharedModule,
        ProductCardModule
    ],
})
export class SelectProductModule {

}
