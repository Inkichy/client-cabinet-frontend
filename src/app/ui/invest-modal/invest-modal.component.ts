import {Component, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import { parseErrors } from '../../core/utls/parse-error.utls';

declare var $: any;

@Component({
  selector: 'app-invest-modal',
  templateUrl: './invest-modal.component.html',
  styleUrls: ['./invest-modal.component.less']
})
export class InvestModalComponent implements OnInit {
  base: CabinetPortfolioModel;
  personal: CabinetPortfolioModel;

  errors = [];

  constructor(
    private cabinetService: CabinetService
  ) {
  }

  ngOnInit() {
    this.cabinetService.getPortfolioWithFilter(false, 'Брокерское обслуживание').subscribe(
      items => {
        this.base = items.filter(_ => _.CODE === 'base').pop();
        this.personal = items.filter(_ => _.CODE === 'personal-broker').pop();
      },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
    });
  }

  onClose() {
    $.fancybox.close();
  }
}
