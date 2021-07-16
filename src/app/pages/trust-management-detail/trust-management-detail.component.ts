import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CabinetPortfolioModel } from '../../core/models/cabinet-data.model';
import { CabinetService } from '../../core/services/api/cabinet.service';
import { GetImageService } from '../../core/services/get-image.service';
import { parseErrors } from '../../core/utls/parse-error.utls';
import { NotificationsService } from '../../core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';

declare let jQuery: any;

@Component({
  selector: 'app-trust-management-detail',
  templateUrl: './trust-management-detail.component.html',
  styleUrls: ['./trust-management-detail.component.less']
})
export class TrustManagementDetailComponent implements OnInit {

  product: CabinetPortfolioModel;
  childProduct: CabinetPortfolioModel;
  productInstalled = false;
  iisInstalled = false;
  isHasIIS: any;
  errors = [];

  constructor(
    private route: ActivatedRoute,
    private cabinetService: CabinetService,
    private imageService: GetImageService,
    private notes: NotificationsService
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      if (this.isHasIIS == null) {
        this.cabinetService.isUserHasIIS().subscribe(item => {
          this.isHasIIS = item;
        });
      }

      this.cabinetService.getPortfolioById(+id).subscribe(item => {
        this.product = item;
        this.cabinetService.getPortfolioByParentId(this.product.ID).subscribe(parentItem => {
          this.childProduct = parentItem;
        },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          });
        setTimeout(() => {
          const incomePercent = +this.product.targetYield.split('-')[1];
          const serviceFee = this.parseFloat(this.product.management_fee);
          const successfulFee = this.parseFloat(this.product.success_fee);
          // @ts-ignore
          window.sliderInit(serviceFee, successfulFee, incomePercent);
        }, 200);
      });
      this.cabinetService.getUserPortfolioByProductId(id).subscribe(
        item => {
          if (item) {
            this.productInstalled = true;
          }
        }
      );
      this.cabinetService.getUserPortfolio().subscribe((data) => {
        data.forEach((_) => {
          if (_.product.PARENT_ID) {
            this.iisInstalled = true;
          }
        });
      },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        });
    }
  }

  parseFloat(num: string) {
    return parseFloat(num.replace(',', '.'));
  }

  getImage(product, type) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }

   sendPurchaseRequest(product: number) {
    if (this.isHasIIS) {
      this.notes.add(new Notification('Уважаемый клиент!', `Продукт ИИС уже подключен в вашем портфеле.`));
    } else {
      this.notes.add(new Notification('Уважаемый клиент!', `Запрос отправлен.`));
      this.cabinetService.sendPurchaseRequest(product).subscribe(data => {
        if (data) {
          this.notes.add(new Notification('Уважаемый клиент!', `В ближайшее время с вами свяжется Ваш финансовый советник по вопросам
          инвестирования в данный продукт`));
        } else {
          this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка, пожалуйста, повторите запрос позднее.`));
          return false;
        }
      },
        error => {
          this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка, пожалуйста, повторите запрос позднее.`));
          this.errors = parseErrors(error.error.errorMsg);
        });
      }
    }
}
