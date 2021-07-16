import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {AnalyticsModel} from '../../models/analytics.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService extends ApiService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getAnalytics() {
    return this.http.get<AnalyticsModel[]>(this.getApiUrl('cabinet/AnalyticsReviews'));
  }
}
