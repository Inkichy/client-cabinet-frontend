import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChartsService extends ApiService {
  getGraph(id: number, start: string, end: string, currency: string) {
    return this.http
      .post<{result: [number, number][]}>(this.getApiUrl(`cabinet/loadGraphMoneyDates`), {
        'portfolioid': id,
        'from': start,
        'to': end,
        'value': currency
      });
  }

  getYield(id: number, start: string, end: string) {
    return this.http
      .post<{result: [number, number][]}>(this.getApiUrl(`cabinet/loadGraphYieldDates`), {
        portfolioid: id,
        from: start,
        to: end,
      });
  }
}
