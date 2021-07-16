import { NgModule } from "@angular/core";
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account.routing.module';
import { PasswordRecoveryModule } from '../auth/pages/password-recovery/password-recovery.module';
import { DadataModule } from 'src/app/directives/dadata/dadata.module';
import { NgxMaskModule } from 'ngx-mask';
import { TMService } from 'src/app/core/services/api/tm.service';
import { SharedModule } from 'src/app/shared/share.module';
import {ToastModule} from 'primeng/toast';
@NgModule({
    declarations: [AccountComponent],
    imports: [
        AccountRoutingModule,
        SharedModule,
        DadataModule,
        NgxMaskModule.forChild(),
        ToastModule,
        PasswordRecoveryModule
    ],
    providers: [TMService]
})
export class AccountModule { }
