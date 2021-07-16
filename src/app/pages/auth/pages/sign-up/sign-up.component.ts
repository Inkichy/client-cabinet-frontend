import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../../core/services/api/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../../../core/validators/PasswordValidation';
import {TokenService} from '../../../../core/services/token.service';
import {CabinetService} from '../../../../core/services/api/cabinet.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {parseErrors} from '../../../../core/utls/parse-error.utls';
import { NotificationsService } from '../../../../core/services/notifications.service';
import { Notification } from '../../../../core/models/notification.model';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {
  step = 1;
  errors = [];
  isLoading = false;
  isDisableResendSms = false;
  isDisableResendEmail = false;
  smsError = false;
  counter: number;
  counterEmail: number;
  timeout: number;
  timeoutEmail: number;
  countDown: any;
  emailCountDown: any;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    patronymic: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.compose([Validators.required, passwordValidator, Validators.minLength(8)])),
    repeatPassword: new FormControl(null, [Validators.required]),
    agree: new FormControl(null, [Validators.required]),
  }, [PasswordValidation.matchPassword('repeatPassword')]);

  formConfirm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router,
              private tokenService: TokenService,
              private route: ActivatedRoute,
              private cabinetService: CabinetService,
              private notes: NotificationsService,  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      this.form.patchValue({
        name: params['firstName'],
        lastName: params['lastName'],
        patronymic: params['middleName']
      });
    });
  }

  onSubmitSms() {
    this.errors = [];
    this.isLoading = true;
    this
      .authService
      .confirmSms(this.formConfirm.get('code').value)
      .subscribe(_ => {
        console.log('here2');
        this.isLoading = false;
        if (_.success === true) {
          this.cookieService.set('isAuth', 'yes');
          localStorage.setItem('isAuth', 'yes');
          this.cabinetService.getData().subscribe();
          this.router.navigate(['/welcome']);
        }
      },
        error => {
          console.log('here');
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
    this.authService.resendSms().subscribe(_ => {
      if (_.success === true) {
        this.timeout = _.timeout;
      }
    },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });
  }

  onSubmit() {
    clearInterval(this.countDown);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      window.scrollTo(0, 0);
    } else {
      this.errors = [];
      this.isLoading = true;
      const form = this.form.getRawValue();
      form.phone = +('7' + form.phone.replace(/\D+/g, ''));
      this
        .authService
        .signUp(form).subscribe(_ => {
          this.isLoading = false;
          if (_.success === true) {
            // Редирект на подтверждение SMS
            this.step = 2;
            this.timeout = _.timeout;
            this.timeoutEmail = _.timeout;
            this.isDisableResendSms = true;
            this.timer(this.timeout, 'ResendSms');
          } else {
            this.errors = parseErrors(_.errorMsg);
            window.scrollTo(0, 0);
          }
        },
        error => {
          clearInterval(this.emailCountDown);
          if (error.error.smsError) {
            this.isLoading = false;
            this.smsError = true;
            this.step = 2;
            this.timer(error.error.timeout, 'ResendEmail');
            this.authService.resendEmail().subscribe();
          } else {
            this.errors = parseErrors(error.error.errorMsg);
          }
        });
    }
  }
  sendToMail() {
    clearInterval(this.emailCountDown);
    this.isDisableResendEmail = true;
    this.timer(this.timeoutEmail, 'ResendEmail');
    this.authService.resendEmail().subscribe(_ => {
      this.timeoutEmail = _.timeout;
      this.notes.add(new Notification('Уважаемый клиент!', `Письмо с кодом отправлено вам на почту!.`));
    });
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

function passwordValidator(control: FormControl) {

  let resultErr = {
    hasNumber: false,
    hasCapitalCase: false,
    hasSmallCase: false,
    hasSpecialCharacters: false
  };

  if (control.value !== null && !control.value.match(/\d/)) {
    resultErr.hasNumber = true;
  }
  if (control.value !== null && !control.value.match(/[A-Z]/)) {
    resultErr.hasCapitalCase = true;
  }
  if (control.value !== null && !control.value.match(/[a-z]/)) {
    resultErr.hasSmallCase = true;
  }
  if (control.value !== null && !control.value.match(/[\[\]\!\@\#\$\%\^\&\*\(\)\_\+\-\=\{\}\;\'\:\"\|\,\.\<\>]/)) {
    resultErr.hasSpecialCharacters = true;
  }

  return resultErr.hasNumber || resultErr.hasCapitalCase || resultErr.hasSmallCase || resultErr.hasSpecialCharacters ? resultErr : null;
}
