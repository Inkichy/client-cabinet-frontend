import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../../../core/validators/PasswordValidation';
import { AuthService } from '../../../../core/services/api/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../../core/services/token.service';
import { parseErrors } from '../../../../core/utls/parse-error.utls';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.less']
})
export class PasswordChangeComponent implements OnInit {
  @Output() sendOutput = new EventEmitter();
  @Input() errors: string[] = [];
  @Input() mode = 1;

  MODE_UNAUTH = 1;
  MODE_AUTH = 2;

  form: FormGroup = new FormGroup({
    password: new FormControl(null, Validators.compose([Validators.required, passwordValidator, Validators.minLength(8)])),
    repeatPassword: new FormControl(null, [Validators.required]),
  }, [PasswordValidation.matchPassword('repeatPassword')]);

  isLoading = false;
  passwordObj: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    this.errors = [];
    if (this.form.invalid) {
      this.errors = [
        'Заполните правильно необходимые поля'
      ];
    } else {
      this.errors = [];
      this.isLoading = true;
      this.sendOutput.emit({ password: this.form.get('password').value, repeatPassword: this.form.get('repeatPassword').value});
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
