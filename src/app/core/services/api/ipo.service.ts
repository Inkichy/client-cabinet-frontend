import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class IpoService extends ApiService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getIpoList() {
    return this.http.get<any>(this.getApiUrl('cabinet/broker/getProducts'));
  }

  getContracts(portfolioId: number) {
    return this.http.post<any>(this.getApiUrl('cabinet/broker/getContracts'), {portfolioId});
  }

  deleteAssignment(id: number) {
    return this.http.post<any>(this.getApiUrl('cabinet/broker/cancelContract'), {contractId: id});
  }

  createAssignment(data: any) {
    return this.http.post<any>(this.getApiUrl('cabinet/broker/createAssignment'), data);
  }
  createAssignmentSms() {
    return this.http.post<any>(this.getApiUrl('cabinet/broker/createAssignmentSms'), {});
  }

  createAssignmentConfirm(data: any) {
    return this.http.post<any>(this.getApiUrl('cabinet/broker/createAssignmentConfirm'), data);
  }

  getAssignmentDocument(document: any) {
    return this.http.post<ArrayBuffer>(
      this.getApiUrl('cabinet/broker/getAssignmentDocument'),
      document,
      { responseType: 'arraybuffer' as 'json'}
    );
  }
}
