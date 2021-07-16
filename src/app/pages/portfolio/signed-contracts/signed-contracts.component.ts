import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TMService} from 'src/app/core/services/api/tm.service';
import {CabinetService} from '../../../core/services/api/cabinet.service';
import {CabinetUserPortfolioModel} from '../../../core/models/cabinet-data.model';
import { parseErrors } from '../../../core/utls/parse-error.utls';

@Component({
  selector: 'app-signed-contracts',
  templateUrl: 'signed-contracts.component.html',
  styleUrls: ['signed-contracts.component.less']
})
export class SignedContractsComponent implements OnInit {
  public id: number;
  public signedDocuments = [];
  item: CabinetUserPortfolioModel;
  errors = [];

  constructor(
    private route: ActivatedRoute,
    private cabinetService: CabinetService,
    private tmService: TMService
  ) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getSignedContracts();
    this.getProduct();
  }

  public getSignedContracts() {
    this.tmService.signedDocuments(this.id).subscribe((data: any) => {
      this.signedDocuments = data;
    },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });
  }

  public getProduct() {
    this.cabinetService.getUserPortfolioById(this.id).subscribe(
      product => {
        this.item = product;
      },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });
  }
}
