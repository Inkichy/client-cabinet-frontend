import {Component, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {ProcessDataService} from '../../core/services/process-data.service';
import {ActivatedRoute} from '@angular/router';
import {CabinetPortfolioModel, CabinetUserPortfolioModel, Requisites} from '../../core/models/cabinet-data.model';
import {GetImageService} from '../../core/services/get-image.service';

@Component({
  selector: 'app-tm-purchase-step-three',
  templateUrl: './tm-purchase-step-three.component.html',
  styleUrls: ['./tm-purchase-step-three.component.less']
})
export class TmPurchaseStepThreeComponent implements OnInit {
  id: number;
  summ: number;
  currency: string;
  userProduct: CabinetUserPortfolioModel;
  requisites: Requisites[];
  errors = [];

  constructor(
    private cabinetService: CabinetService,
    private route: ActivatedRoute,
    private processDataService: ProcessDataService,
    private imageService: GetImageService
  ) {
  }

  ngOnInit() {
    this.summ = this.processDataService.getPaymentSum();
    this.currency = this.processDataService.getPaymentCurrency();
    this.id = +this.route.snapshot.paramMap.get('id');

    this.cabinetService.getUserPortfolioById(this.id).subscribe(
      item => {
        this.userProduct = item;
        this.cabinetService.getRequisites().subscribe(items => this.requisites = items.filter(
          _ => this.userProduct.product.currencys.indexOf(_.CURRENCY.toLowerCase()) > -1 &&
            this.userProduct.product.ITEM_TYPE === _.ITEM_TYPE
        ));
      }
    );
  }

  getImage(product: CabinetPortfolioModel | Requisites, type?) {
    if (product && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }

  getCurrencyTitle(currency: string) {
    switch (currency) {
      case 'RUR':
        return 'рублей';
      case 'USD':
        return 'долларов США';
    }
  }
}
