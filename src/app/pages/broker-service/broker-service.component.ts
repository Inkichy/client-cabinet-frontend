import {Component, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {parseErrors} from '../../core/utls/parse-error.utls';

@Component({
  selector: 'app-broker-service',
  templateUrl: './broker-service.component.html',
  styleUrls: ['./broker-service.component.less']
})
export class BrokerServiceComponent implements OnInit {
  stocksAndBonds: any = [];
  errors = [];
  tariffs: CabinetPortfolioModel[];
  activeTab = 1;
  productInstalled: boolean;
  baseId: any;

  constructor(private cabinetService: CabinetService) {
  }

  ngOnInit() {
    this.cabinetService
      .getPortfolioWithFilter(false, 'Брокерское обслуживание')
      .subscribe(
        items => {
          this.tariffs = items;
          if (this.productInstalled === null) {
            this.cabinetService.getUserPortfolio().subscribe(
              userItems => {
                if (this.productInstalled === null) {
                  this.productInstalled = false;
                  const a = [];
                  userItems.forEach((userItem, i) => a.push(userItem.portfolioId));
                  this.tariffs.forEach((item, i) => {
                    if (a.indexOf(item.ID) > -1) {
                      this.productInstalled = true;
                      return false;
                    }
                  });
                }
              }
            );
          }
        },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        }
      );

    this.cabinetService
        .getPortfolio()
        .subscribe(
        (items) => {
          if (this.stocksAndBonds.length === 0) {
            this.stocksAndBonds = items.filter(item => (item.ITEM_TYPE === 'Акции' || item.ITEM_TYPE === 'Облигации') && item.ACTIVE);
          }
          this.baseId = items.filter(item => item.name === 'Базовый тариф')[0].ID;
          },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          });
  }
}
