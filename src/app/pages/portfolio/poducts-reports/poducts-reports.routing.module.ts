import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductReportsComponent } from './poducts-reports.component';
import { AuthModalModule } from '../../../ui/auth-modal/auth-modal.module';
const productReportsRoutes: Routes = [{ path: '', component: ProductReportsComponent }];
@NgModule({
    imports: [RouterModule.forChild(productReportsRoutes)],
    exports: [RouterModule,
              AuthModalModule
    ]
})
export class ProductsReportsRoutingModule {

}
