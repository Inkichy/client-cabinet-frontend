import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentsPageComponent, } from './documents-page.component';
import {DocumentsPageRoutingModule} from './documents-page.routing.module';
import {AuthModalModule} from '../../ui/auth-modal/auth-modal.module';
import { PreloaderModule } from 'src/app/ui/preloader/preloader.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    declarations: [DocumentsPageComponent],
    imports: [
        CommonModule,
        DocumentsPageRoutingModule,
        AuthModalModule,
        PreloaderModule,
        PdfViewerModule
    ],
    exports: [DocumentsPageComponent]
})
export class DocumentsPageModule {
}
