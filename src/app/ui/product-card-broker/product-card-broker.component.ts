import {Component, Input, OnInit} from '@angular/core';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {GetImageService} from '../../core/services/get-image.service';

@Component({
  selector: 'app-product-card-broker',
  templateUrl: './product-card-broker.component.html',
  styleUrls: ['./product-card-broker.component.less']
})
export class ProductCardBrokerComponent implements OnInit {
  @Input() product: CabinetPortfolioModel;

  constructor(
    private imageService: GetImageService
  ) { }

  ngOnInit() {
  }

  getImage(product: CabinetPortfolioModel, type) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }
}
