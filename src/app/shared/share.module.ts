import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '../ui/layout/layout.module';
import {TopPanelModule} from '../ui/top-panel/top-panel.module';
import {InvestModalModule} from '../ui/invest-modal/invest-modal.module';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {QuestionnaireComponent} from '../ui/questionnaire/questionnaire.component';
import {InvestProfileFormComponent} from '../ui/investment-profile-form/investment-profile-form.component';
import {InfoModal} from '../modals/info-modal/info-modal';
import {TopPanelImageModule} from '../ui/top-panel-image/top-panel-image.module';
import {NgxMaskModule} from 'ngx-mask';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [QuestionnaireComponent, InvestProfileFormComponent, InfoModal],
  imports: [
    CommonModule,
    LayoutModule,
    TopPanelModule,
    InvestModalModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule,
    RouterModule,

  ],
  exports: [
    CommonModule,
    LayoutModule,
    TopPanelModule,
    InvestModalModule,
    ReactiveFormsModule,
    FormsModule,
    QuestionnaireComponent,
    InvestProfileFormComponent,
    InfoModal,
    TopPanelImageModule
  ]
})
export class SharedModule {

}
