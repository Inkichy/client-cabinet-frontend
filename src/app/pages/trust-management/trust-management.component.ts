import {Component, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {chunkArray} from '../../core/utls/chunk-array.utls';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { parseErrors } from '../../core/utls/parse-error.utls';

@Component({
  selector: 'app-trust-management',
  templateUrl: './trust-management.component.html',
  styleUrls: ['./trust-management.component.less']
})
export class TrustManagementComponent implements OnInit {
  items: any = [];
  strategies: any = [];
  errors = [];

  constructor(private cabinetService: CabinetService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.cabinetService
      .getStrategies()
      .subscribe((items) => this.strategies = items);

    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.cabinetService
        .getPortfolioWithFilter(params.get('filter'), 'Доверительное управление')
        .subscribe((items) => {
          items = items.sort((a: any, b: any) => {
            return b.CALC_YIELD - a.CALC_YIELD;
          });
          this.items = chunkArray(items, 3);
        },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          });
    });

  }
}
