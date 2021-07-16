import {Component, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/api/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {parseErrors} from '../../../../core/utls/parse-error.utls';
import {CabinetService} from '../../../../core/services/api/cabinet.service';
import {ValidatorService} from '../../../../core/services/validator.service';
import { NotificationsService } from '../../../../core/services/notifications.service';
import { Notification } from '../../../../core/models/notification.model';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit, OnDestroy {

    formConfirm: FormGroup = new FormGroup({
        code: new FormControl(null, [Validators.required]),
    });

    isConfirmAuth: false;
    isLoading = false;
    @Output() isLoadPreloader = new EventEmitter<boolean>();
    smsConfirmation = false;
    errors = [];
    validateErrors = [];
    code = '';
    isDisableResendSms = false;
    isDisableResendEmail = false;
    form = {
        login: '',
        password: ''
    };
    smsResendForm: any;
    subscription: any;
    smsError = false;
    counter: number;
    counterEmail: number;
    timeout: number;
    timeoutEmail: number;
    countDown: any;
    emailCountDown: any;


    constructor(private authService: AuthService,
                private cookieService: CookieService,
                private cabinetService: CabinetService,
                private router: Router,
                private notes: NotificationsService,
                private validatorService: ValidatorService) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
      if(this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
    }

    clearErrors() {
        this.validateErrors = [];
        this.errors = [];
    }

    formFields() {
        return {
            login: [
                {
                    min: 10,
                    max: 17,
                    optional: ['+', '(', ')', ' ', '-'],
                    symbol: 'digit',
                    error: 'Логин должен содержать корректный email или номер телефона.',
                    name: 'phone'
                },
                {
                    min: 5,
                    max: 100,
                    required: ['@', '.'],
                    symbol: 'any',
                    error: 'Логин должен содержать корректный email или номер телефона.',
                    name: 'email'
                }
            ],
            password: [
                {
                    min: 6,
                    max: 35,
                    symbol: 'any',
                    error: 'Пароль должен содержать от 6 до 35 символов.'
                }
            ]
        };
    }

    async checkPortfolioItems() {
        this.isLoadPreloader.emit(true);
        if (!this.cabinetService.dataLoaded) {
            await this.cabinetService.getData().toPromise();
            this.subscription = this.cabinetService.getUserPortfolio().subscribe(
                data => {
                    this.isLoading = false;
                    if (data.length !== 0) {
                        this.router.navigate(['/portfolio']);
                    } else {
                        this.router.navigate(['/main']);
                    }
                },
                error => {
                    this.isLoading = false;
                    this.isLoadPreloader.emit(false);
                    this.errors = parseErrors(error.error.errorMsg);
                }
            );
        }
    }

    onSubmit(data) {
        clearInterval(this.countDown);
        this.isLoading = true;
        this
            .authService
            .signIn(data).subscribe(
            response => {
                this.timeout = response.timeout;
                this.timeoutEmail = response.timeout;
                this.isLoading = false;
                if (response.success === true) {
                    if (response.phone === true || response.email === true) {
                      this.isDisableResendSms = true;
                      this.timer(this.timeout, 'ResendSms');
                      this.smsConfirmation = true;
                      this.isDisableResendEmail = true;
                      this.timer(this.timeout, 'ResendEmail');
                    } else {
                        this.cookieService.set('isAuth', 'yes');
                        localStorage.setItem('isAuth', 'yes');
                        this.checkPortfolioItems();
                    }
                } else {
                    this.errors = parseErrors(response.errorMsg);
                    window.scrollTo(0, 0);
                }
            },
            error => {
                clearInterval(this.emailCountDown);
                this.isLoading = false;

                if (error.error.smsError) {
                  this.smsError = true;
                  this.smsConfirmation = true;
                  this.isDisableResendEmail = true;
                  this.timer(error.error.timeout, 'ResendEmail');
                  this.authService.resendSmsEmailLogin(this.smsResendForm).subscribe();
                } else {
                  this.errors = parseErrors(error.error.errorMsg);
                }
            });
    }

    onSubmitSms() {
        this.isLoading = true;
        this.authService.confirmSmsLogin(this.formConfirm.get('code').value).subscribe(
            _ => {
                this.isLoading = false;
                if (_.success === true) {
                    this.cookieService.set('isAuth', 'yes');
                    localStorage.setItem('isAuth', 'yes');
                    this.checkPortfolioItems();
                } else {
                    this.errors = parseErrors(_.errorMsg);
                    window.scrollTo(0, 0);
                }
            },
            error => {
                this.isLoading = false;
                this.errors = parseErrors(error.error.errorMsg);
            });
    }

    onResendSms() {
        clearInterval(this.countDown);
        if (this.isDisableResendSms) {
            return false;
        }
        this.isDisableResendSms = true;
        this.timer(this.timeout, 'ResendSms');
        this.authService.resendSmsLogin(this.smsResendForm).subscribe(
            _ => {
                if (_.success === true) {
                  this.timeout = _.timeout;
                }
            },
            error => {
                this.errors = parseErrors(error.error.errorMsg);
            });
    }

    onGosAuth() {
        this.clearErrors();
        if (this.ConfirmTerms()) {
            this.isLoadPreloader.emit(true);
            this.authService.gosuslugi().subscribe(
                (response) => {
                    location.href = response.link;
                },
                error => {
                    this.errors = parseErrors(error.error.errorMsg);
                });
        }
    }

    onValueTest() {
        this.clearErrors();
        const isFormValid = this.validatorService.validate(this.formFields(), this.form);
        if (!isFormValid.valid) {
            this.validateErrors = isFormValid.errorMsg;
        } else {
            const data = {...this.form};
            const digitRegexp = /\d/gm;
            if (digitRegexp.test(data.login) && !data.login.includes('@')) {
                data.login = data.login.replace(/^\d/gm, '7');
            }
            if (isFormValid.rename.length) {
                isFormValid.rename.forEach(ren => {
                    data[ren.newName] = data[ren.oldName];
                    delete data[ren.oldName];
                });

            }
            this.smsResendForm = data;
            this.onSubmit(data);
        }
    }

    ConfirmTerms() {
        if (this.validateErrors.length || !this.isConfirmAuth) {
            this.errors = ['Вы не дали согласие на обработку персональных данных!'];
            return false;
        }
        return true;
    }

    backToMain() {
        this.form = {
            login: '',
            password: ''
        };
        this.isConfirmAuth = false;
        this.smsConfirmation = false;
        this.isDisableResendEmail = false;
    }
    sendToMail() {
      clearInterval(this.emailCountDown);
      this.isDisableResendEmail = true;
      this.timer(this.timeoutEmail, 'ResendEmail');
      this.authService.resendSmsEmailLogin(this.smsResendForm).subscribe(
        _ => {
          this.timeoutEmail = _.timeout;
          this.notes.add(new Notification('Уважаемый клиент!', `Письмо с кодом отправлено вам на почту!.`));
        }
      );
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
