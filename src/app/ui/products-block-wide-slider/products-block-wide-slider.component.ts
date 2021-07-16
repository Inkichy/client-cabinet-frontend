import { Component, Input, OnInit } from '@angular/core';
import { CabinetPortfolioModel } from '../../core/models/cabinet-data.model';
import { GetImageService } from '../../core/services/get-image.service';
import {InvestmentService} from '../../core/services/api/investment.service';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
  selector: 'app-products-block-wide-slider',
  templateUrl: './products-block-wide-slider.component.html',
  styleUrls: ['./products-block-wide-slider.component.less']
})
export class ProductsBlockWideSliderComponent implements OnInit {
  @Input() items: Array<CabinetPortfolioModel>;
  @Input() productInstalled?: boolean;

  constructor(
    private imageService: GetImageService,
    private investmentService: InvestmentService,
    private notes: NotificationsService
  ) {
  }

  ngOnInit() {
  }

  getImage(product: CabinetPortfolioModel) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }

  invest(id: string) {
    this.investmentService.addInvestmentRequest(id);
  }

  ifIEOpenNewTab(e: any) {
    if (window.navigator.msSaveBlob instanceof Function) { // this is for detect IE, baby
      e.preventDefault();
      e.stopPropagation();

      const params = [
          `download=false`,
          `api_url=${e.target.getAttribute('href')}`,
          `type=application/pdf`
      ].join('&');

      window.open(`/documents_page?${params}`);
    }
  }
}