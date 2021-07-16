import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CabinetUserPortfolioModel} from '../../core/models/cabinet-data.model';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {parseErrors} from '../../core/utls/parse-error.utls';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.less']
})
export class SiteMapComponent implements OnInit, AfterViewInit {
  brokerProductInPortfolio: CabinetUserPortfolioModel;
  errors = [];

  constructor(
    private cabinetService: CabinetService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let i;
    const trying = setInterval(() => {
      try {
        window[`accordion`]();
        clearInterval(trying);
      } catch (e) {
        i++;
        if (i > 10) {
          clearInterval(trying);
        }
      }
    }, 100);

    this.cabinetService.getUserPortfolioType('Брокерское обслуживание').subscribe(
      (products) => {
        if (products.length) {
          this.brokerProductInPortfolio = products.pop();
        }
      },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      }
    );
  }
}
