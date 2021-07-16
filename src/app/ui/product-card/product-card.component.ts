import {Component, Input, OnInit} from '@angular/core';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {GetImageService} from '../../core/services/get-image.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.less']
})
export class ProductCardComponent implements OnInit {
  @Input() item: CabinetPortfolioModel;

  constructor(private imageService: GetImageService) {
  }

  ngOnInit() {
  }

  getImage() {
    return this.imageService.getImageUrl(this.item.IBLOCK_ID, this.item.PREVIEW_PICTURE);
  }
}
