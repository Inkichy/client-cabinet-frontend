import {Component, OnInit} from '@angular/core';
import {CabinetUserPortfolioModel, Requisites} from '../../core/models/cabinet-data.model';
import {ActivatedRoute} from '@angular/router';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {GetImageService} from '../../core/services/get-image.service';
import {RequisitesRequestModel} from '../../core/models/payment.model';
import {PaymentService} from '../../core/services/api/payment.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import { parseErrors } from '../../core/utls/parse-error.utls';
import { NotificationsService } from '../../core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import { isNgTemplate } from '@angular/compiler';

declare let jQuery: any;

@Component({
    selector: 'app-payment-details',
    templateUrl: './payment-details.component.html',
    styleUrls: ['./payment-details.component.less']
})
export class PaymentDetailsComponent implements OnInit {

    product: CabinetUserPortfolioModel;
    summ: number;
    bankDetails: Requisites;
    requestRequisites: RequisitesRequestModel;
    date = moment().format('DD.MM.YYYY');
    dateEn = moment().format('MM/DD/YYYY');
    market: string;
    currency: string;
    d_date: number;
    type: string;
    errors = [];
    qr: any;

    // isSuccess: boolean;

    constructor(private route: ActivatedRoute,
                private cabinetService: CabinetService,
                private imageService: GetImageService,
                private paymentService: PaymentService,
                private router: Router,
                private notes: NotificationsService,
                private http: HttpClient,
                private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        // this.isSuccess = false;

        const id = this.route.snapshot.paramMap.get('id');
        this.route.queryParams.subscribe(
            (params) => {
                this.summ = params.summ;
                this.market = params.market;
                this.currency = params.currency;
                this.type = params.type;
                if (this.type) {
                    this.cabinetService.getRequisitesByCodeTypeCurrency(params.bank, params.type, params.currency).subscribe(
                        (item) => this.bankDetails = item
                    );
                } else {
                    this.cabinetService.getRequisitesByCode(params.bank).subscribe(
                        (item) => this.bankDetails = item
                    );
                }
          },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          });

        this.cabinetService.getUserPortfolioById(id).subscribe(
            (item) => {
                this.product = item;
                this.cabinetService.getPortfolioById(this.product.portfolioId).subscribe(
                    product => this.product.product = product
                );
          },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          }
        );

        if (this.bankDetails.NAME === 'Сбербанк') {
            this.getQRSber();
        }
    }

    getQRSber() {
        this.createRequest();

        const url_qr = 'api/cabinet/pdfRequisites?bank_id=' + this.requestRequisites.bank_id.toString() +
            '&portfolioid=' + this.requestRequisites.portfolio.toString() +
            '&purpose=' + this.requestRequisites.purpose.toString() +
            '&summ=' + this.requestRequisites.summ.toString() +
            '&qr=true';

        this.http.get(url_qr).subscribe(response => {
            this.qr = this.sanitizer.bypassSecurityTrustHtml(response['qr']);
        },
        errors => this.qr = 'no qr code');
    }

    getImage(item: Requisites) {
        return item.PREVIEW_PICTURE ? this.imageService.getImageUrl(item.IBLOCK_ID, item.PREVIEW_PICTURE) :
            '/assets/images/payment-DU-step-3/alfa-icon.svg';
    }

    createRequest() {
        this.requestRequisites = new class implements RequisitesRequestModel {};
        this.requestRequisites.bank_id = this.bankDetails.ID;
        this.requestRequisites.portfolio = this.product.id;
        this.requestRequisites.summ = this.summ;

        if (this.product.product.ITEM_TYPE === 'Доверительное управление' && this.currency === 'RUR') {
            return this.requestRequisites.purpose = `Перевод по договору доверительного управления № ` +
                this.product.agreementNumber + ` от ` + this.product.d_date;
        } else if (this.product.product.ITEM_TYPE === 'Доверительное управление' && this.currency === 'USD') {
            return this.requestRequisites.purpose = `Payments of agreement № ` + this.product.agreementNumber;
        } else if (this.product.product.ITEM_TYPE === 'Брокерское обслуживание' && this.currency === 'RUR' && this.market === 'moscow') {
            return this.requestRequisites.purpose = `Перевод денежных средств по Договору присоединения № ` + this.product.agreementNumber
                + ` от ` + this.product.d_date + ` г. (МБ ФР).Без НДС.`;
        } else if (this.product.product.ITEM_TYPE === 'Брокерское обслуживание'
            && this.currency === 'RUR' && this.market === 'spb') {
            return this.requestRequisites.purpose = `Перевод денежных средств по Договору присоединения № ` + this.product.agreementNumber
                + ` от ` + this.product.d_date + ` г. (СПБ).Без НДС.`;
        } else if (this.product.product.ITEM_TYPE === 'Брокерское обслуживание' && this.currency === 'USD') {
            return this.requestRequisites.purpose = `TRANSFER OF FUNDS UNDER AGMT ` + this.product.agreementNumber +
                ` DD ` + this.dateEn + ` (MB SM).NO VAT.`;
        }
    }

    getPdf() {
        this.createRequest();

        const url = 'api%2Fcabinet%2FpdfRequisites%3Fbank_id%3D' + this.requestRequisites.bank_id.toString() +
            '%26portfolioid%3D' + this.requestRequisites.portfolio.toString() +
            '%26purpose%3D' + this.requestRequisites.purpose.toString()  +
            '%26summ%3D' + this.requestRequisites.summ.toString();

        const params2 = [
            `download=false`,
            `api_url=${url}`,
            `type=application/pdf`
        ].join('&');

        window.open(`/documents_page?${params2}`);
    }

    sendByEmail() {
        this.createRequest();
        this.notes.add(new Notification('Уважаемый клиент!', `Реквизиты будут отправлены на Вашу почту в течение минуты.`));

        this.paymentService.sendEmailWithBankDetails(this.requestRequisites).subscribe(response => {
                if (response.success) {
                    this.notes.add(new Notification('Уважаемый клиент!', `Реквизиты успешно отправлены на Вашу почту.`));
                } else {
                    this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка. Реквизиты не были отправлены.`));
                    return false;
                }
        },
          error => {
            this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка. Реквизиты не были отправлены.`));
            this.errors = parseErrors(error.error.errorMsg);
          }
        );
    }

    getCurrencyTitle(currency: string) {
        switch (currency) {
            case 'RUR':
                return 'рублей';
            case 'USD':
                return 'долларов США';
        }
    }

  getAcquiring(bankName) {
    this.paymentService.getAcquiringPage({

      portfolio: +this.product.id,
      summ: +this.summ

    }, bankName)
    .subscribe(
      data => {
        this.notes.add(new Notification('Уважаемый клиент!', `Ваш запрос успешно обработан. Страница для оплаты откроется в новой вкладке`));
        window.open(data.link);
      },
      err => {
        this.notes.add(new Notification('Уважаемый клиент!', `Произошла ошибка сервиса. Попробуйте еще раз.`));
      });
  }
}
