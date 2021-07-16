import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabinetService } from '../../../core/services/api/cabinet.service';
import { CabinetUserPortfolioModel } from '../../../core/models/cabinet-data.model';
import { CabinetPortfolioModel } from '../../../core/models/cabinet-data.model';
import { parseErrors } from '../../../core/utls/parse-error.utls';
import { GetImageService } from '../../../core/services/get-image.service';

@Component({
  selector: 'app-quik',
  templateUrl: './quik.component.html',
  styleUrls: ['./quik.component.less']
})
export class QuikComponent implements OnInit {
  id: number;
  item: CabinetUserPortfolioModel;
  portfolio: CabinetPortfolioModel;
  strategyCurrency: any;
  errors: any;
  currencies: any;

  constructor(private cabinetService: CabinetService,
              private route: ActivatedRoute,
              private imageService: GetImageService) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.cabinetService.getUserPortfolioById(this.id).subscribe(
      item => {
        this.currencies = [];
        this.item = item;
        for (const elem in item.amount) {
          if (item.amount.hasOwnProperty(elem)) {
            this.currencies.push({
                name: elem,
                value: +item.amount[elem]
            });
          }
        }
        this.subscribePortfolio(item.portfolioId);
      }
    );
  }

  private subscribePortfolio(id: any) {
    this.cabinetService
        .getPortfolioByPortfolioId(id)
        .subscribe((model) => {
            this.portfolio = model;
        },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
        });
  }

  getImage(item: CabinetPortfolioModel) {
    return this.imageService.getImageUrl(item.IBLOCK_ID, item.PREVIEW_PICTURE);
  }

  getBalance(item: CabinetUserPortfolioModel) {
    let sum = 0;
    if (item && item.amount) {
        for (const k in item.amount) {
            if (k === 'RUR') {
                sum += +item.amount[k];
            } else {
                sum += +item.amount[k] * item.rates[k];
            }
        }
    }
    return sum;
  }

}
