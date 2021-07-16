import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignedContractsComponent } from './signed-contracts.component';
const signedContractsRoutes: Routes = [{ path: '', component: SignedContractsComponent }]
@NgModule({
    imports: [RouterModule.forChild(signedContractsRoutes)],
    exports: [RouterModule]
})
export class SignedContractsRoutingModule {

}
