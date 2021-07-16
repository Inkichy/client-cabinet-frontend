import {Component, Input, OnInit} from '@angular/core';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {GetImageService} from '../../core/services/get-image.service';

@Component({
  selector: 'app-top-panel-image',
  templateUrl: './top-panel-image.component.html',
  styleUrls: ['./top-panel-image.component.less']
})
export class TopPanelImageComponent implements OnInit {
  @Input() product?: CabinetPortfolioModel;
  @Input() insidePortfolio: boolean;

  constructor(private imageService: GetImageService) { }

  ngOnInit() {

  }

  getImage(product, type?) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }

}
