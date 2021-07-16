import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Notification } from '../../core/models/notification.model';
import { CabinetService } from 'src/app/core/services/api/cabinet.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { parseErrors } from 'src/app/core/utls/parse-error.utls';
import { CabinetDataModel } from 'src/app/core/models/cabinet-data.model';
import { ActivatedRoute, Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-agreement-page',
  templateUrl: './agreement-page.component.html',
  styleUrls: ['./agreement-page.component.less']
})
export class AgreementPageComponent implements OnInit {

  timeout: number;
  isDisableResendSms = false;
  isDisableResendEmail = false;
  isConfirmLoading = false;
  isCancelLoading = false;
  smsError = false;
  isSended = false;
  isError = false;
  isConfirmation = false;
  errors = [];
  counter: number;
  counterEmail: number;
  countDown: any;
  emailCountDown: any;
  agreementText: string;

  formConfirm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });


  constructor(
    private cabinetService: CabinetService,
    private notes: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        if (params.hash) {
          this.cabinetService.getAgreement(params.hash)
          .subscribe((response: any) => {
            this.agreementText = response.message;
          },
          (error) => {
            this.errors = error.error.errorMsg[0];
            this.notes.add(
              new Notification(
                'Уважаемый клиент!',
                `${this.errors}`
              )
            );
          }
          );
        }
      }
    );
  }

  cancel(): void {
    this.formConfirm.reset();
    this.isConfirmation = false;
  }

  confirmAgrement() {
    this.isConfirmLoading = true;
    this.cabinetService.setAgrement({
      agreement: true
    }).subscribe(response => {
      this.isConfirmLoading = false;
      this.isConfirmation = true;
      this.isDisableResendSms = true;
      this.timeout = response.timeout;
      this.timer(this.timeout, 'ResendSms');
    });
  }

  cancelAgrement() {
    this.isCancelLoading = true;
    this.cabinetService.setAgrement({
      agreement: false
    }).subscribe((response: any) => {
      this.isCancelLoading = false;
      this.router.navigate(['/portfolio']);
      this.notes.add(
        new Notification(
          'Уважаемый клиент!',
          `${response.message}`
        )
      );
    },
    (error) => {
      this.isCancelLoading = false;
      this.notes.add(
        new Notification(
          'Уважаемый клиент!',
          `Что-то пошло не так. Попробуйте еще раз`
        )
      );
    });
  }

  onSubmitSms(): void {
    this.isConfirmLoading = true;
    this.cabinetService
      .agreementConfirm({code: +this.formConfirm.get('code').value})
      .subscribe(
        (response: any) => {
          this.isConfirmLoading = false;
          this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Ваше согласие успешно подтверждено`
            )
          );
          this.formConfirm.reset();
          setTimeout(() => this.router.navigate(['/portfolio']), 5000);
          this.isConfirmation = false;


          if (response.success === false) {
            this.isConfirmLoading = false;
            this.errors = response.error.errorMsg;
          }
        },
        (error) => {
          this.isConfirmation = false;
          this.isConfirmLoading = false;
          this.errors = error.error.errorMsg;
        }
      );
  }


  onResendSms(): any {
    clearInterval(this.countDown);
    if (this.isDisableResendSms) {
      return false;
    }
    this.isDisableResendSms = true;
    this.timer(this.timeout, 'ResendSms');
    this.cabinetService.agreementConfirm({ type: 'resend'}).subscribe(
      (_: any) => {
        if (_.success === true) {
        } else {
          this.errors = parseErrors(_.errorMsg);
        }
      },
      (error) => {
        clearInterval(this.emailCountDown);
        this.smsError = true;
        this.errors = parseErrors(error.error.errorMsg);
        this.cabinetService.agreementConfirm({ type: 'mail'}).subscribe((_: any) => {
        });
      }
    );
  }

  sendToMail(): void {
    clearInterval(this.emailCountDown);
    this.isDisableResendEmail = true;
    this.timer(this.timeout, 'ResendEmail');
    this.cabinetService.agreementConfirm({ type: 'mail'}).subscribe((_: any) => {
      if (_.success === true) {
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Письмо с кодом отправлено вам на почту.`
          )
        );
      } else {
        this.errors = parseErrors(_.errorMsg);
      }
    });
  }

  timer(time: number = 30, toggle: string): void {
    if (toggle === 'ResendSms') {
      this.counter = time;
      this.countDown = setInterval(() => {
        this.counter--;
        if (this.counter <= 0) {
          this.isDisableResendSms = false;
          clearInterval(this.countDown);
        }
      }, 1000);
    } else {
      this.counterEmail = time;
      this.emailCountDown = setInterval(() => {
        this.counterEmail--;
        if (this.counterEmail <= 0) {
          this.isDisableResendEmail = false;
          clearInterval(this.emailCountDown);
        }
      }, 1000);
    }
  }



}
