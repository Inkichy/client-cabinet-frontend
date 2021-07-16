import {Injectable} from '@angular/core';
import {CabinetPortfolioModel} from '../models/cabinet-data.model';
import {TMDocuments} from '../models/tm-documents.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessDataService {
  private paymentSum: number;
  private paymentCurrency: string;
  private documents: TMDocuments[];

  public savePaymentSum(summ: number) {
    this.paymentSum = summ;
  }
  public savePaymentCurrency(curr: string) {
    this.paymentCurrency = curr;
  }
  public saveDocuments(documents: TMDocuments[]) {
    this.documents = documents;
  }

  public getPaymentSum() {
    return this.paymentSum;
  }
  public getPaymentCurrency() {
    return this.paymentCurrency;
  }
  public getDocuments() {
    return this.documents;
  }
}
