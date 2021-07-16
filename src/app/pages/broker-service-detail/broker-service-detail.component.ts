import {Component, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {ActivatedRoute} from '@angular/router';
import {GetImageService} from '../../core/services/get-image.service';
import { parseErrors } from '../../core/utls/parse-error.utls';
import { NotificationsService } from '../../core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';

declare let jQuery: any;
@Component({
  selector: 'app-broker-service-detail',
  templateUrl: './broker-service-detail.component.html',
  styleUrls: ['./broker-service-detail.component.less']
})
export class BrokerServiceDetailComponent implements OnInit {
  bonds: any = [];
  stocks: any = [];
  errors = [];
  product: CabinetPortfolioModel;
  childProduct: CabinetPortfolioModel;
  productInstalled = false;
  iisInstalled = false;

  constructor(private cabinetService: CabinetService,
              private route: ActivatedRoute,
              private imageService: GetImageService,
              private notes: NotificationsService) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.cabinetService
      .getPortfolio()
      .subscribe(
        (items) => {
          if (this.stocks.length === 0) {
            this.stocks = items.filter(item => item.ITEM_TYPE === 'Акции');
            this.bonds = items.filter(item => item.ITEM_TYPE === 'Облигации');
            this.product = items.filter(item => item.ID === +id).pop();
            this.childProduct = items.filter(item => +item.PARENT_ID === +this.product.ID).pop();
          }
        },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        });

    this.cabinetService.getUserPortfolioByProductId(id).subscribe(
      (item) => {
        if (item) {
          this.productInstalled = true;
        }
      },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      }
    );

    this.cabinetService.getUserPortfolio().subscribe((data) => {
      data.forEach((_) => {
        if (_.product.PARENT_ID) {
          this.iisInstalled = true;
        }
      });
    });
    // console.log(this.iisInstalled);
  }

  getImage(product, type) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }

  sendPurchaseRequest(product: number) {
    this.cabinetService.sendPurchaseRequest(product).subscribe(data => {
      if (data) {
        this.notes.add(new Notification('Уважаемый клиент!', `В ближайшее время с вами свяжется Ваш финансовый
         советник по вопросам инвестирования в данный продукт.`));
      } else {
        return false;
      }
    },
      error => {
        this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка. Пожалуйста, повторите запрос позднее.`));
        this.errors = parseErrors(error.error.errorMsg);
      });
}
  sendPurchaseChildProductRequest(product: number) {
    if (this.iisInstalled) {
      this.notes.add(new Notification('Уважаемый клиент!', `У вас уже подключен ИИС.`));
    } else {
      this.cabinetService.sendPurchaseRequest(product).subscribe(data => {
        if (data) {
          this.notes.add(new Notification('Уважаемый клиент!', `В ближайшее время с вами свяжется Ваш финансовый
         советник по вопросам инвестирования в данный продукт.`));
        } else {
          return false;
        }
      },
        error => {
          this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка. Пожалуйста, повторите запрос позднее.`));
          this.errors = parseErrors(error.error.errorMsg);
        });
    }
  }
}
