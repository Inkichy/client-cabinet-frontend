import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TimeService extends ApiService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getCurrentTime() {
    return this.http.get<any>(this.getApiUrl(''));
  }
}
