import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { TMPurchaseDataModel, TMPurchaseDataResponseModel } from '../../models/tm-purchase-data.model';
import { TMDocuments } from '../../models/tm-documents.model';

@Injectable({
  providedIn: 'root',
})
export class TMService extends ApiService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  reports(model) {
    return this.http.post(this.getApiUrl('cabinet/products-reports'), model);
  }

  analytics(model) {
    return this.http.post(this.getApiUrl('cabinet/products-analytics'), model);
  }

  getReportsYears(id: number) {
    return this.http.get(this.getApiUrl(`cabinet/getPortfolioExistenceYears?product=${id}`));
  }

  depositWithdrawalFunds(model) {
    return this.http.post(this.getApiUrl('cabinet/funds-deposit-withdrawal'), model);
  }

  signedDocuments(id: number) {
    return this.http.get(this.getSwaggerUrl(`cabinet/signed-contracts/${id}`));
  }

  purchase(model: TMPurchaseDataModel) {
    return this.http.post<{
      success: boolean,
      errorMsg: string[],
      data: TMPurchaseDataResponseModel
    }>(this.getApiUrl('portfolio/buy'), model);
  }

  confirm(id: number, code: string) {
    return this.http.post<any>(this.getApiUrl(`user-portfolio/documentsConfirm/${id}`), { code });
  }

  resendSms(id: number) {
    return this.http.post<any>(this.getSwaggerUrl(`tm/purchase-resend-sms`), { id });
  }
}
