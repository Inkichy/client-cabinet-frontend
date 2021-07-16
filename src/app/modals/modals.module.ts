import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule} from '@angular/router';
import { AskedQuestionModal } from './asked-question/asked-question.modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MeetModal } from './meet/meet.modal';
import { DropdownModule } from 'primeng/dropdown';
import { NoticesListModal } from './notices-list/notices-list.modal';
import { IpoAssignmentModal } from './ipo-assignment/ipo-assignment';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
@NgModule({
    declarations: [
      AskedQuestionModal,
      MeetModal,
      NoticesListModal,
      IpoAssignmentModal,
      ConfirmModalComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      DropdownModule,
      CalendarModule,
      NgxMaskModule.forChild(),
    ],
    providers: [DatePipe],
    entryComponents: [],
    exports: [
      AskedQuestionModal,
      MeetModal,
      NoticesListModal,
      IpoAssignmentModal,
      ConfirmModalComponent
    ]
})
export class ModalsModule {}
