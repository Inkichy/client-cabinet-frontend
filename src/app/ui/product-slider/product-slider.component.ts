import {Component, OnInit} from '@angular/core';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {GetImageService} from '../../core/services/get-image.service';
import {CabinetService} from '../../core/services/api/cabinet.service';
import { parseErrors } from '../../core/utls/parse-error.utls';
@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.less']
})
export class ProductSliderComponent implements OnInit {
  tab = 1;
  allStock = [];
  allBond = [];

  errors = [];

  constructor(private cabinetService: CabinetService,
              private imageService: GetImageService) {
  }

  ngOnInit() {
    this.subscribeAllStock();
    this.subscribeAllBonds();
  }

  getImage(product: CabinetPortfolioModel) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }

  private subscribeAllStock() {
    this.cabinetService.getAllStock().subscribe((items) => {
      if (this.allStock.length === 0) {
        this.allStock = items;
      }
    },
    error => {
      this.errors = parseErrors(error.error.errorMsg);
    });
  }

  private subscribeAllBonds() {
    this.cabinetService.getAllBond().subscribe((items) => {
      if (this.allBond.length === 0) {
        this.allBond = items;
      }
    },
    error => {
      this.errors = parseErrors(error.error.errorMsg);
    });
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
