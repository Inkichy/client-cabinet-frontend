import {Component, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {chunkArray} from '../../core/utls/chunk-array.utls';
import {parseErrors} from '../../core/utls/parse-error.utls';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.less']
})
export class CatalogComponent implements OnInit {
  brokerItems: CabinetPortfolioModel[];
  trustManagementItems: CabinetPortfolioModel[];
  errors = [];

  constructor(
    private cabinetService: CabinetService
  ) { }

  ngOnInit() {
    this.cabinetService
      .getPortfolioWithFilter(false, 'Брокерское обслуживание').subscribe(
        items => {
          this.brokerItems = items;
        },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        }
    );

    this.cabinetService
      .getPortfolioWithFilter(false, 'Доверительное управление').subscribe(
        items => {
          this.trustManagementItems = chunkArray(items, 3);
        },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        }
    );
  }

}
