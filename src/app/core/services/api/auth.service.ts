import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { SignUpModel } from '../../models/sign-up.model';
import { SignInModel } from '../../models/sign-in.model';
import { ForgotModel } from '../../models/forgot.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import {SimpleResponseModel} from '../../models/cabinet-data.model';
import {CabinetService} from './cabinet.service';
import { map, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {

  constructor(protected http: HttpClient,
              private cookieService: CookieService,
              private router: Router,
              public cabinetService: CabinetService) {
    super(http);
  }

  /**
   * Регистрация пользователя
   * @param model SignUpModel
   */
  signUp(model: SignUpModel) {
    return this.http.post<any>(this.getApiUrl('auth/registration'), model);
  }

  /**
   * Авторизация
   * @param model SignInModel
   */
  signIn(model) {
    return this.http.post<SimpleResponseModel>(this.getApiUrl('auth/login'), model);
  }

  /**
   * Передача кода
   * @param code string
   */
  confirmSms(code: string) {
    return this.http.post<any>(this.getApiUrl('auth/sms-confirm'), { code });
  }

  /**
   * Передача кода
   * @param code string
   */
  confirmSmsLogin(code: string) {
    return this.http.post<any>(this.getApiUrl('auth/login/sms-confirm'), { code });
  }
  /**
   * Передача кода
   */
  resendSmsLogin(model) {
    return this.http.post<any>(this.getApiUrl('auth/login/sms-request'), model);
  }

  /**
   * Отправка кода на почту
   */
  resendSmsEmailLogin(model) {
    return this.http.post<any>(this.getApiUrl('auth/login/sms-request-email'), model);
  }

  /**
   * Повторная отправка смс
   */
  resendSms() {
    return this.http.post<any>(this.getApiUrl('auth/phone-request'), {});
  }

  /**
   * Регистрация пользователя с кодом на почту
   */
  resendEmail() {
    return this.http.post<any>(this.getApiUrl('auth/email-request'), {});
  }

  /**
   * Запрос восстановления пароля
   * @param model ForgotModel
   */
  forgot(model: ForgotModel) {
    return this.http.post<any>(this.getApiUrl('auth/forgot'), model);
  }

  /**
   * Повторный Запрос восстановления пароля SMS
   */
  forgotSmsRequest(hash?) {
    return this.http.post<any>(this.getApiUrl('auth/forgotConfirm'), { hash, "type": "resend" });
  }

/**
   * Запрос кода восстановления пароля на email
   */
  forgotEmailRequest() {
    return this.http.post<any>(this.getApiUrl('auth/forgotConfirm'), { "type": "mail" });
  }

  /**
   * Запрос восстановления пароля SMS
   */
  forgotSmsConfirm(code: string, hash?) {
    return this.http.post<any>(this.getApiUrl('auth/forgotConfirm'), { code, hash });
  }

  /**
   * Сброс пароля
   */
  changePassword(password: any, hash?) {
    return this.http.post<any>(this.getApiUrl('auth/forgotConfirm'), { password, hash });
  }

  gosuslugi() {
    return this.http.post<any>(this.getApiUrl('auth/login/gosuslugi'), {});
  }

  /**
   * Завершение сессии
   */
  signOut() {
    this.cookieService.delete('isAuth');
    this.cookieService.delete('PHPSESSID');
    localStorage.removeItem('client');
    localStorage.removeItem('isAuth');
    localStorage.removeItem('isCheckedNotifications');
    this.cabinetService.dataLoaded = false;
    this.cabinetService.isShownAlert = false;
    this.cabinetService.popUpShow = false;
    this.router.navigate(['auth/sign-in']);
    return this.http.get<any>(this.getApiUrl('auth/logout'));
  }
}
