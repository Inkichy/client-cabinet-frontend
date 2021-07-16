import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {InvestmentRequestModel} from '../../models/investment-request.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService extends ApiService {

  investmentRequests: Observable<InvestmentRequestModel[]>[] = [];
  productToAdd = null;

  constructor(protected http: HttpClient) {
    super(http);
  }

  getInvestmentRequests(page: number, tariff: number): Observable<InvestmentRequestModel[]> {
    if (!!this.productToAdd) {
      this.http.post(this.getSwaggerUrl(`cabinet/add-investment-request`),
        {productId: this.productToAdd, tariffId: tariff}).subscribe(() => {
        this.productToAdd = null;
        if (this.investmentRequests.length < page) {
          this.investmentRequests.push(
            this.http.get<InvestmentRequestModel[]>(this.getSwaggerUrl(`cabinet/investment-requests?page=${page}&tariffId=${tariff}`))
          );
        }
        return this.investmentRequests[page - 1];
      });
    } else {
      if (this.investmentRequests.length < page) {
        this.investmentRequests.push(
          this.http.get<InvestmentRequestModel[]>(this.getSwaggerUrl(`cabinet/investment-requests?page=${page}&tariffId=${tariff}`))
        );
      }
      return this.investmentRequests[page - 1];
    }
  }

  addInvestmentRequest(productId: string) {
    this.productToAdd = productId;
  }

  deleteInvestmentRequest(requestId: string) {
    return this.http.post(this.getSwaggerUrl(`cabinet/delete-investment-request`), {requestId});
  }
}
