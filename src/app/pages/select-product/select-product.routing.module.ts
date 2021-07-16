import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectProductComponent } from './select-product.component';
const selectProductRoutes: Routes = [{ path: '', component: SelectProductComponent }]
@NgModule({
    imports: [RouterModule.forChild(selectProductRoutes)],
    exports: [RouterModule]
})
export class SelectProductRoutingModule {

}
