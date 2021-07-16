import { Component, OnInit } from '@angular/core';
import {AnalyticsService} from '../../core/services/api//analytics.service';
import {AnalyticsModel} from '../../core/models/analytics.model';
import { parseErrors } from '../../core/utls/parse-error.utls';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.less']
})
export class AnalyticsComponent implements OnInit {

  articles: AnalyticsModel[];
  errors = [];

  constructor(
    private analyticsService: AnalyticsService
  ) { }

  ngOnInit() {
    this.analyticsService.getAnalytics().subscribe(
      items => {
        this.articles = items;
      },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });
  }
}
