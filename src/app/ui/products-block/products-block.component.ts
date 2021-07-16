import {Component, Input, OnInit} from '@angular/core';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {GetImageService} from '../../core/services/get-image.service';

@Component({
  selector: 'app-products-block',
  templateUrl: './products-block.component.html',
  styleUrls: ['./products-block.component.less']
})
export class ProductsBlockComponent implements OnInit {
  private model: CabinetPortfolioModel;

  @Input()
  set value(item: CabinetPortfolioModel) {
    this.model = item;
  }

  get value() {
    return this.model;
  }

  constructor(private imageService: GetImageService) {
  }

  ngOnInit() {
  }

  getImage() {
    return this.imageService.getImageUrl(this.model.IBLOCK_ID, this.model.PREVIEW_PICTURE);
  }
}
