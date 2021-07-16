import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import {DocumentsPageComponent} from './documents-page.component';

const documentsPageRoutes: Routes = [{ path: '', component: DocumentsPageComponent }]
@NgModule({
    imports: [RouterModule.forChild(documentsPageRoutes)],
    exports: [RouterModule]
})
export class DocumentsPageRoutingModule {

}
