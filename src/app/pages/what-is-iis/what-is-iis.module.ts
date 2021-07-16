import { NgModule } from '@angular/core';
import { WhatIsIISComponent } from './what-is-iis.component';
import { WhatIsIISRoutingModule } from './what-is-iis.routing.module';
import { TopPanelModule } from 'src/app/ui/top-panel/top-panel.module';
import { SlickModule } from 'src/app/directives/slick/slick.module';
import { ProductCardModule } from 'src/app/ui/product-card/product-card.module';
import { SharedModule } from 'src/app/shared/share.module';

@NgModule({
    declarations: [WhatIsIISComponent],
    imports: [
        WhatIsIISRoutingModule,
        SlickModule,
        TopPanelModule,
        SharedModule,
        ProductCardModule
    ],

})
export class WhatIsIISModule { }
