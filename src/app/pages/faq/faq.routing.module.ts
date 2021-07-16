import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './faq.component';

const faqRoutes: Routes = [{ path: '', component: FaqComponent }]
@NgModule({
    imports: [RouterModule.forChild(faqRoutes)],
    exports: [RouterModule]
})
export class FaqRoutingModule {

}
