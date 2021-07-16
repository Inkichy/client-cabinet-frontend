import {AfterViewInit, OnInit,  Component} from '@angular/core';
import {CabinetService} from 'src/app/core/services/api/cabinet.service';
import {GetImageService} from 'src/app/core/services/get-image.service';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {parseErrors} from '../../core/utls/parse-error.utls';

@Component({
  selector: 'what-is-iis',
  templateUrl: 'what-is-iis.component.html',
  styleUrls: ['what-is-iis.component.less']
})
export class WhatIsIISComponent implements AfterViewInit, OnInit {
  public products = [];
  public productSlide = [];
  errors = [];
  constructor(private cabinetService: CabinetService, private imageService: GetImageService) {
  }

  ngOnInit() {
    this._getIISProducts();
  }

  ngAfterViewInit() {
    let i;
    const trying = setInterval(() => {
      try {
        window['accordion']();
        clearInterval(trying);
      } catch (e) {
        i++;
        if (i > 10) {
          clearInterval(trying);
        }
      }
    }, 100);
  }

  private _getIISProducts() {
    this.cabinetService.getPortfolioForIIS().subscribe((data) => {
      if (data && data.length) {
        this.products = data;
        if (this.productSlide.length === 0) {
          this.productSlide = data.length > 3 ? data.slice(0, 3) : data;
        }
      }
    },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });
  }

  getImage(product: CabinetPortfolioModel) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }

  getUrl(product: CabinetPortfolioModel) {
    switch (product.ITEM_TYPE) {
      case 'Брокерское обслуживание':
        return '/broker-service/' + product.ID;
      case 'Акции':
      case 'Облигации':
        return '/broker-service/';
      case 'Доверительное управление':
        return '/trust-management/' + product.ID;
    }
    return '';
  }
}
