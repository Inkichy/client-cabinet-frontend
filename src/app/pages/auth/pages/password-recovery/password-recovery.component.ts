import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/api/auth.service';
import { CabinetService } from '../../../../core/services/api/cabinet.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../../core/services/token.service';
import { parseErrors } from '../../../../core/utls/parse-error.utls';
import { NotificationsService } from '../../../../core/services/notifications.service';
import { Notification } from '../../../../core/models/notification.model';
import {SignInComponent} from '../sign-in/sign-in.component';
declare var jQuery: any;

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.less']
})
export class PasswordRecoveryComponent implements OnInit {
  step = 1;
  isDisableResendSms = false;
  isDisableResendEmail = false;
  @Input() mode = 1;
  @Input() inputStep: number;

  MODE_UNAUTH = 1;
  MODE_AUTH = 2;
  newPassword: any;
  smsError = false;
  counter: number;
  counterEmail: number;
  timeout: number;
  timeoutEmail: number;
  countDown: any;
  emailCountDown: any;


  form: FormGroup = new FormGroup({
    value: new FormControl(null, [Validators.required]),
  });

  formConfirm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  isLoading = false;
  errors = [];
  hash: string;
  model = {};


  constructor(
    private authService: AuthService,
    private cabinetService: CabinetService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    private tokenService: TokenService,
    private notes: NotificationsService ) {
  }

  ngOnInit() {
    if (this.inputStep) {
        this.step = this.inputStep;
    }
    this.route.queryParams.subscribe(
      params => {
        if (params.hash) {
          this.hash = params.hash;
        }
        // if (this.hash) {
        //   this.step = 2;
        // }
      }
    );
  }

  onForgot() {
    clearInterval(this.countDown);
    this.errors = [];
    this.isLoading = true;

    const value = this.form.get('value').value;
    if (value.indexOf('@') === -1) {
      this.model = { phone: value };
    } else {
      this.model = { email: value };
    }

    this
      .authService
      .forgot(this.model)
      .subscribe(_ => {
        this.isLoading = false;
        if (_.success) {
          this.timeout = _.timeout;
          this.timeoutEmail = _.timeout;
          this.isDisableResendSms = true;
          this.timer(this.timeout, 'ResendSms');
          this.step = 2;
        } else { // с сервера может прилететь ошибка с 200 статусом, такие дела
          this.errors = parseErrors(_.errorMsg);
        }
      },
      error => {
        clearInterval(this.emailCountDown);
        this.isLoading = false;
        if (error.error.smsError) {
          this.smsError = true;
          this.step = 2;
          this.isDisableResendEmail = true;
          this.timer(this.timeoutEmail, 'ResendEmail');

          if (+this.mode === this.MODE_UNAUTH) {
            this.authService.forgotEmailRequest().subscribe();
          } else {
            this.cabinetService.changePasswordEmail(this.newPassword).subscribe();
          }
        } else {
          this.errors = parseErrors(error.error.errorMsg);
        }
      });
  }


  onSubmitSms() {
    this.errors = [];
    this.isLoading = true;
    if (+this.mode === this.MODE_UNAUTH) {
      this
        .authService
        .forgotSmsConfirm(this.formConfirm.get('code').value, this.hash)
        .subscribe(_ => {
          this.isLoading = false;
          if (_.success === true) {
            this.router.navigate(['/auth/sign-in']);
            jQuery.fancybox.open({
              src: '#register-modal',
              autoFocus: false
            });
          } else {
            this.errors = parseErrors(_.errorMsg);
          }
        },
          error => {
            this.isLoading = false;
            this.errors = parseErrors(error.error.errorMsg);
          }
        );
    } else {
      this
        .cabinetService
        .forgotSmsConfirm(this.formConfirm.get('code').value)
        .subscribe(_ => {
          this.isLoading = false;
          if (_.success === true) {
            this.cookieService.set('isAuth', 'yes');
            this.router.navigate(['/main']);
            jQuery.fancybox.open({
              src: '#change-password-success-modal',
              autoFocus: false
            });
          } else {
            this.errors = parseErrors(_.errorMsg);
          }
        },
        error => {
          this.isLoading = false;
          this.errors = parseErrors(error.error.errorMsg);
        });
    }
  }


  onResendSms() {
    clearInterval(this.countDown);
    if (this.isDisableResendSms) {
      return false;
    }
    this.isDisableResendSms = true;
    this.timer(this.timeout, 'ResendSms');
    if (+this.mode === this.MODE_UNAUTH) {
      this
        .authService
        .forgotSmsRequest(this.hash)
        .subscribe(_ => {
          if (_.success === true) {
            this.timeout = _.timeout;
          } else {
            this.errors = parseErrors(_.errorMsg);
          }
        });
    } else {
      this
        .cabinetService
        .forgotSmsRequest(this.hash)
        .subscribe(_ => {
          if (_.success === true) {
            this.timeout = _.timeout;
          } else {
            this.errors = parseErrors(_.errorMsg);
          }
        },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          });
    }
  }

  authPasswordInputSuccess(item) {
    if (+this.mode === this.MODE_AUTH) {
      this.newPassword = item;
    } else {
      this.newPassword = item['password'];
    }
    this.changePassword();
  }


  changePassword() {
    clearInterval(this.countDown);

    if (+this.mode === this.MODE_AUTH) {
      this
        .cabinetService
        .changePassword(this.newPassword)
        .subscribe(_ => {
          this.timeout = _.timeout;
          this.timeoutEmail = _.timeout;
          if (_.success === true) {
            this.isDisableResendSms = true;
            this.timer(this.timeout, 'ResendSms');
          }
          if (_.success === false) {
            this.isLoading = false;
            this.errors = parseErrors(_.errorMsg);
          } else {
            this.step = 2;
          }
        },
          error => {
            if (error.error.smsError) {
              this.step = 2;
              this.smsError = true;
              clearInterval(this.emailCountDown);
              this.isDisableResendEmail = true;
              this.timer(this.timeoutEmail, 'ResendEmail');

              this.cabinetService.changePasswordEmail(this.newPassword).subscribe(_ => {
                this.timeoutEmail = _.timeout;
              });
            } else {
              this.errors = parseErrors(error.error.errorMsg);
            }

          });
    } else {
      this
        .authService
        .changePassword(this.newPassword, this.hash)
        .subscribe(_ => {
          this.timeout = _.timeout;
          this.timeoutEmail = _.timeout;
          if (_.success === true) {
            this.isDisableResendSms = true;
            this.timer(this.timeout, 'ResendSms');
          }
          if (_.success === false) {
            this.isLoading = false;
            this.errors = parseErrors(_.errorMsg);
          } else {
            this.router.navigate(['/auth/sign-in']);
            jQuery.fancybox.open({
              src: '#change-password-success-modal',
              autoFocus: false
            });
            // this.step = 2;
          }
        },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          });
    }

  }
  sendToMail() {
      clearInterval(this.emailCountDown);
      this.isDisableResendEmail = true;
      this.timer(this.timeoutEmail, 'ResendEmail');
      if (+this.mode === this.MODE_UNAUTH) {
        this
          .authService
          .forgotEmailRequest()
          .subscribe(_ => {
            this.timeoutEmail = _.timeout;
            this.notes.add(new Notification('Уважаемый клиент!', `Письмо с кодом отправлено вам на почту!.`));
      });
      } else {
        this
          .cabinetService
          .changePasswordEmail(this.newPassword)
          .subscribe(_ => {
            this.timeoutEmail = _.timeout;
            this.notes.add(new Notification('Уважаемый клиент!', `Письмо с кодом отправлено вам на почту!.`));
      });
      }
}
timer(time: number = 45, toggle: string) {
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
