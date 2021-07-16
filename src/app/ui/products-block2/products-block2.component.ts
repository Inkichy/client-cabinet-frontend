import {Component, Input, OnInit} from '@angular/core';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {GetImageService} from '../../core/services/get-image.service';

@Component({
  selector: 'app-products-block2',
  templateUrl: './products-block2.component.html',
  styleUrls: ['./products-block2.component.less']
})
export class ProductsBlock2Component implements OnInit {
  activeTab = 1;
  @Input() NewStockAndBond: CabinetPortfolioModel;

  @Input() productInstalled?: boolean;

  constructor(private imageService: GetImageService) {
  }

  ngOnInit() {
  }

  getImage(product: CabinetPortfolioModel) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
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
