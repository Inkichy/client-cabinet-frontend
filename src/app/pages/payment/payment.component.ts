import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CabinetPortfolioModel, CabinetUserPortfolioModel, RatesModel, Requisites} from '../../core/models/cabinet-data.model';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {GetImageService} from '../../core/services/get-image.service';
import {PaymentService} from '../../core/services/api/payment.service';
import { RequisitesRequestModel } from '../../core/models/payment.model';
import {ProcessDataService} from '../../core/services/process-data.service';
import { NotificationsService } from '../../core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';
import * as moment from 'moment';
import { parseErrors } from '../../core/utls/parse-error.utls';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {

  @ViewChild('stepOne') stepOne: ElementRef;
  @ViewChild('stepTwo') stepTwo: ElementRef;
  @ViewChild('stepThree') stepThree: ElementRef;
  @ViewChild('summInput') summInput: ElementRef;

  stepOpen = 1;
  market: string;
  currency = 'RUR';
  id: string;
  acquiringReq: RequisitesRequestModel;
  acquiring = true;
  requisites: Requisites[];
  requisitesToShow: Requisites[];
  currencies = ['RUR'];
  products: CabinetUserPortfolioModel[];
  selectedProduct: CabinetUserPortfolioModel;
  errors = [];
  form = this.formBuilder.group({
    summ: [null,
       Validators.compose(
         [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(9),
        Validators.pattern(/^[0-9]+$/)
        ]
       )
      ]
  });

  constructor(
      private route: ActivatedRoute,
      private cabinetService: CabinetService,
      private imageService: GetImageService,
      private paymentService: PaymentService,
      private notes: NotificationsService,
      private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {


    this.cabinetService.getUserPortfolio().subscribe(items => {
      this.products = items;

      this.id =  this.route.snapshot.paramMap.get('id');
      if (this.id) {
        this.setProduct(this.id);
        if (this.selectedProduct) {
          this.stepOpen = 2;

          const interval = setInterval(() => {
            try {
              this.scrollTo(this.stepOne.nativeElement);
              clearInterval(interval);
            } catch (e) {}
          }, 50);
        }
      }
    },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });

    this.cabinetService.getRequisites().subscribe(items => {
      this.requisites = items;
    },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });
    // this.cabinetService
    //   .getRates()
    //   .subscribe((model) => {
    //     this.rates = model;
    //   });
  }

  scrollTo(target: HTMLElement) {
    setTimeout(() => {
      target.scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }, 200);
  }

  setProduct(productId) {
    if (!productId) {
      return;
    }
    this.selectedProduct = this.products.filter((item) => item.id === productId).pop() || null;
    this.currencies = this.selectedProduct.product.currencys;
    if (this.currencies.length === 1) {
      this.setCurrency(this.currencies[0]);
    }
    this.stepOpen = 2;
    this.setMarket('moscow');
  }

  getImage(item: Requisites) {
    return item.PREVIEW_PICTURE ? this.imageService.getImageUrl(+item.IBLOCK_ID, item.PREVIEW_PICTURE) :
        '/assets/images/payment-DU-step-3/alfa-icon.svg';
  }

  stepTwoInit() {
    if (this.selectedProduct) {
      this.stepOpen = 2;
      this.scrollTo(this.stepThree.nativeElement);
    }
  }

  stepThreeInit() {
    this.requisitesToShow = this.requisites
      .filter(_ => _.CURRENCY === this.currency && _.ITEM_TYPE === this.selectedProduct.product.ITEM_TYPE);
    if (this.selectedProduct.product.name === 'Восточный. Стабильный рост' ) {
      this.requisitesToShow = this.requisites
        .filter(_ => _.ID === '20902');
    }
    if (this.form.get('summ').value > 0) {
      this.stepOpen = 3;
      this.scrollTo(this.stepThree.nativeElement);
    }
  }

  setMarket(market) {
    this.market = market;
  }

  setCurrency(currency) {
    this.currency = currency;
    return false;
  }

  getCurrencyTitle(currency: string) {
    switch (currency) {
      case 'RUR':
        return 'рублей';
      case 'USD':
        return 'долларов США';
    }
  }

  getBalance(item: CabinetUserPortfolioModel) {
    let sum = 0;

    if (item.amount) {
      for (const k in item.amount) {
        if (k === 'RUR') {
          sum += +item.amount[k];
        } else {
          sum += +item.amount[k] * item.rates[k]; // this.rates[k];
        }
      }
    }

    return sum;
  }

  getAcquiring( bankName) {
    this.paymentService.getAcquiringPage({

      portfolio: +this.selectedProduct.id,
      summ: +this.form.get('summ').value

    }, bankName).subscribe(
      data => {
        this.notes.add(new Notification('Уважаемый клиент!', `Ваш запрос успешно обработан. Страница для оплаты откроется в новой вкладке`));
        window.open(data.link);
    },
      err => {this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка сервиса. Попробуйте еще раз.`));
    });
  }
}
