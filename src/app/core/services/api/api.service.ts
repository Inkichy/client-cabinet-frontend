import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(protected http: HttpClient) {
  }

  public getApiUrl(action: string): string {
    return environment.apiEndpoint + action;
  }

  protected getSwaggerUrl(action: string): string {
   // return environment.apiEndpoint + action
    return 'https://virtserver.swaggerhub.com/Rubedite/qbfinance/1.0.0/' + action;
  }
}
