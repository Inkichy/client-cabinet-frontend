import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {RequisitesRequestModel} from "../../models/payment.model";

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends ApiService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  pdfRequisites(model: RequisitesRequestModel) {
    return this.http.post<any>(this.getApiUrl('cabinet/pdfRequisites'), model);
  }

  sendEmailWithBankDetails(model: RequisitesRequestModel) {
    return this.http.post<any>(this.getApiUrl('cabinet/sendEmailWithBankDetails'), model);
  }

  getAcquiringPage(model: RequisitesRequestModel, bankName) {
    return this.http.post<any>(this.getApiUrl('banks/' + bankName + 'Payment'), model);
  }

}
