import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfilePersonalDataModel } from '../../models/profile-personal-data.model';
import { ProfileContactsModel } from '../../models/profile-contacts.model';
import { ProfileAdditionalInfoModel } from '../../models/profile-additional-info.model';
import { ProfilePassportModel, ProfilePassportWithImage } from '../../models/profile-passport.model';
import { ProfileBankModel } from '../../models/profile-bank.model';
import { ProfileInvestmentClientModel } from '../../models/profile-investment-client.model';
import { ClientModel } from '../../models/profile-client.model';
import {ProfileIISModel} from '../../models/profile-iis.model';
import * as moment from 'moment';
import {SimpleResponseModel} from '../../models/cabinet-data.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends ApiService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  public askQuestion(question) {
    return this.http.post(this.getApiUrl('profile/question'), question, { observe: "response", responseType: "text" });
  }

  public makeLetter(letter) {
    return this.http.post(this.getSwaggerUrl('profile/write-letter'), letter, { observe: "response", responseType: "text" });
  }

  savePersonalData(model: ProfilePersonalDataModel) {
    return this.http.post<ProfilePersonalDataModel>(this.getApiUrl('cabinet/changePersonalData'), model);
  }

  saveEdo() {
    const today = moment().format('DD.MM.YYYY');
    return this.http.post<ProfilePersonalDataModel>(this.getApiUrl('cabinet/saveFieldRequest'), {
      edo: today
    });
  }

  saveContacts(model: ProfileContactsModel) {
    return this.http.post<ProfileContactsModel>(this.getApiUrl('cabinet/saveFieldRequest'), model);
  }

  saveClient(model: ClientModel) {
    return this.http.post<ClientModel>(this.getApiUrl('cabinet/changePersonalData'), model);
  }

  saveAdditionalInfo(model: ProfileAdditionalInfoModel) {
    return this.http.post<ProfileAdditionalInfoModel>(this.getApiUrl('cabinet/saveFieldRequest'), model);
  }

  saveBank(model: ProfileBankModel) {
    return this.http.post<ProfileBankModel>(this.getApiUrl('cabinet/saveFieldRequest'), model);
  }

  saveIIS(model: ProfileIISModel) {
    return this.http.post<ProfileBankModel>(this.getApiUrl('cabinet/saveFieldRequest'), model);
  }

  savePassport(model: ProfilePassportModel) {
    return this.http.post<ProfilePassportWithImage>(this.getApiUrl('cabinet/saveFieldRequest'), model);
  }

  savePassportWithImage(model: ProfilePassportWithImage) {
    return this.http.post<ProfilePassportWithImage>(this.getSwaggerUrl('cabinet/saveFieldRequest'), model);
  }

  saveInvestmentClient(model: ProfileInvestmentClientModel) {
    return this.http.post<ProfileInvestmentClientModel>(this.getApiUrl('account-management/save-brokerForm'), model);
  }

  getInvestmentClient() {
    return this.http.get<ProfileInvestmentClientModel>(this.getSwaggerUrl('profile/investment-client'));
  }

  getContacts() {
    return this.http.get<ProfileContactsModel>(this.getSwaggerUrl('profile/contacts'));
  }

  getBank(model: any) {
    return this.http.post<any>(this.getApiUrl('cabinet/loadRequisitesInfo'), model);
  }

  saveQuiz(model) {
    return this.http.post(this.getApiUrl('cabinet/saveApplicationForm'), model);
  }

  saveQuizConfirm(code: string) {
    return this.http.post(this.getApiUrl('cabinet/saveApplicationFormConfirm'), {code});
  }

  saveUserInfo(model) {
    return this.http.post<SimpleResponseModel>(this.getApiUrl('cabinet/changePersonalData'), model, this.httpOptions );
  }

  saveConfirm(code) {
    return this.http.post(this.getApiUrl('cabinet/changePersonalDataConfirm'), code);
  }

  uploadFile(formData: FormData) {
    return this.http.post(this.getApiUrl('cabinet/uploadFiles'), formData);
  }
}
