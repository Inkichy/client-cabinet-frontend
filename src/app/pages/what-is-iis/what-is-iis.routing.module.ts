import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhatIsIISComponent } from './what-is-iis.component';
const iisRoutes: Routes = [{ path: '', component: WhatIsIISComponent }]
@NgModule({
    imports: [RouterModule.forChild(iisRoutes)],
    exports: [RouterModule]
})
export class WhatIsIISRoutingModule { }
