import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { MenuModule } from '../menu/menu.module';
import { LogoModule } from '../logo/logo.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatDialogModule } from '@angular/material/dialog';
import {CalendarModule} from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/components/common/messageservice';
import { ModalsModule } from '../../modals/modals.module';
@NgModule({
  declarations: [SidebarComponent],
  imports: [
    MenuModule,
    LogoModule,
    CommonModule,
    RouterModule,
    MatDialogModule,
    NgxMaskModule.forChild(),
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
    ModalsModule
  ],
  entryComponents: [],
  exports: [SidebarComponent, MenuModule],
  providers: [MessageService]
})
export class SidebarModule { }
