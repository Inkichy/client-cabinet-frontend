import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import {CabinetService} from '../../../core/services/api/cabinet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CabinetUserPortfolioModel} from '../../../core/models/cabinet-data.model';
import { NotificationsService } from '../../../core/services/notifications.service';
import { Notification } from '../../../core/models/notification.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DocumentsPageComponent} from '../../documents-page/documents-page.component';
import {parseErrors} from '../../../core/utls/parse-error.utls';
import {Subscription, BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';
import { CabinetDataModel } from '../../../core/models/cabinet-data.model';


@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.less']
})
export class WithdrawRequestComponent implements OnInit, OnDestroy{

  private readonly subscriptions$: Subscription = new Subscription();
  dataSubject: BehaviorSubject<CabinetDataModel> = new BehaviorSubject(null);

  @ViewChild('topOfPage') topOfPage: ElementRef;
  client: any;
  portfolioId: number;
  bxid: number;
  item: CabinetUserPortfolioModel;
  currencies = [];
  currency = null;
  allStock = [];
  allBond = [];
  withdrawSumm: number;
  isEnableButton = false;
  isRequest = false;
  isWrongSumm: boolean;
  currencyError = false;
  allSumm = false;
  isConfirmSms = false;
  smsError = false;
  isDisableResendSms = false;
  errors = [];
  validateErrors = [];
  isLoading = false;
  step: number;
  method: string;
  fileName: string;
  fileUrl: string;
  counter: number;
  countDown: any;
  counterEmail: number;
  emailCountDown: any;
  isDisableResendEmail = false;
  timeout: number;
  timeoutEmail: number;
  previousStep: number;


  formConfirm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('\d')]),
  });

  formWithdraw: FormGroup = new FormGroup({
    bankBik: new FormControl(null, [Validators.required]),
    bankName: new FormControl(null, [Validators.required]),
    bankAccount: new FormControl(null, [Validators.required, Validators.minLength(20)]),
    bankCorr: new FormControl(null, [Validators.required]),
    summ: new FormControl(null, [Validators.required])
  });

  constructor(
    private cabinetService: CabinetService,
    private route: ActivatedRoute,
    private notes: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.portfolioId = +this.route.snapshot.paramMap.get('id');
    this.cabinetService.dataSubject.subscribe(client => {
      this.formWithdraw.patchValue(client.client.requisites);
      this.timeout = client.config.timeout;
      this.timeoutEmail = client.config.timeout;
    });
    this.subscribePortfolio();
    this.subscribeAllStock();
    this.subscribeAllBonds();
    this.isRequest = false;


      // this.timeout = response.timeout;
      // this.timeoutEmail = response.timeout;

    if (this.method === "withdraw") {
        this.previousStep = this.step;
        this.step = 1;
      } else if (this.method === "cancel") {
        this.previousStep = this.step;
        this.step = 3;
      } else {
        console.log("Unknown method");
      }
  }

  getCurrencyTitle(currency: string) {
    switch (currency) {
      case 'RUR':
          return 'рублей';
      case 'USD':
          return 'долларов США';
      case 'EUR':
          return 'евро';
    }
  }

  checkForm() {
    this.formWithdraw.markAllAsTouched();

    if (!this.formWithdraw.valid || !this.currency) {
      if (!this.currency) {
        this.currencyError = true;
      }
      return false;
    }
    return true;
  }

  sendRequest() {
    if (this.checkForm()) {
      const requestJson = Object.assign({portfolio_id: this.portfolioId, value: this.currency.name, method: this.method, summ: this.formWithdraw.get('summ').value});
      if (this.formWithdraw.get('summ').value <= this.currency.value) {
        this.isWrongSumm = false;
        this.isRequest = true;

        // this.cabinetService.getUserPortfolioById(this.portfolioId).subscribe(item => this.portfolioId = +item.portfolioId);
        // this.cabinetService.getBxIdProductByPortfolioId(this.portfolioId).subscribe(item => this.bxid = item[0]);
        this.cabinetService.withdrawSmsRequest(requestJson).subscribe((response: any)=> {
          this.fileName = response.title;
          this.fileUrl = response.url;
        });
        this.step = 2;
        clearInterval(this.countDown);
        if (this.isDisableResendSms) {
            return false;
        }
        this.isDisableResendSms = true;
        this.timer(this.timeout, 'ResendSms');
        setTimeout(() => this.topOfPage.nativeElement.scrollIntoView(), 100);
      } else {
        this.isWrongSumm = true;
      }
    }
  }

  private subscribePortfolio() {
    this.cabinetService
      .getUserPortfolioById(this.portfolioId)
      .subscribe((item) => {
        this.item = item;
        this.method = item.withdraw.method;
        this.currencies = [];
        for (const elem in item.amount) {
            this.currencies.push({
              name: elem,
              value: +item.amount[elem]
            });
      }

        this.currencies = this.currencies.filter(i => i.name === 'RUR');
        // if(this.currencies.length === 1) {
        this.setCurrency(this.currencies[0]);
        // }

      });
  }

  setCurrency(currency) {
    this.currency = currency;
    this.currencyError = false;
    this.formWithdraw.get('summ').enable();

    if (this.allSumm) {
      this.allSumm = false;
      this.formWithdraw.patchValue({
        summ: null
      });
    }

    return false;
  }

  private subscribeAllStock() {
    this.cabinetService.getAllStock().subscribe((items) => {
      this.allStock = items;
    });
  }

  private subscribeAllBonds() {
    this.cabinetService.getAllBond().subscribe((items) => {
      this.allBond = items;
    });
  }

  setAllSumm(summ, isChecked) {
    if (!summ) {
      this.currencyError = true;
    } else {
      if (isChecked) {
        this.formWithdraw.patchValue({
          summ: summ
        });
        this.formWithdraw.get('summ').disable();
      } else {
        this.formWithdraw.patchValue({
          summ: null
        });
        this.formWithdraw.get('summ').enable();
      }
    }
  }

  onSubmitSms() {
    clearInterval(this.countDown);
    this.isLoading = false;
    this.isDisableResendSms = true;
    this.timer(this.timeout, 'ResendSms');

    const requestJson = {
      portfolio_id: this.portfolioId,
      code: this.formConfirm.get('code').value
    };
    this.cabinetService.withdrawSmsConfirm(requestJson).subscribe(
      (response: any) => {
        if (response.success === true) {
          this.client =  JSON.parse(localStorage.getItem('client'));
          const portfolio = this.client.userPortfolios.filter(i => +i.id === this.portfolioId);
          if (this.method === 'withdraw') {

            portfolio[0].withdraw = {
              method: 'cancel',
              type: 'Поручение на вывод ДС',
              date: moment().format('DD.MM.YYYY'),
              cash: this.formWithdraw.get('summ').value,
              currency: 'рублей'
            };
          } else {

            portfolio[0].withdraw = {
              method: 'withdraw'
            };
        }
          this.dataSubject.next(this.client);
          localStorage.setItem('client', JSON.stringify(this.client));
          this.cabinetService.getData().subscribe();
          this.notes.add(new Notification('Уважаемый клиент!',
            `Спасибо за обращение. В ближайшее время с Вами свяжется финансовый советник для подписания документов`,
            this.router.navigate([`/portfolio/${this.portfolioId}`])
          ));
        } if(response.success === false) {
          this.notes.add(new Notification('Уважаемый клиент!', `${response.errorMsg[0]}`));
        }
      },
      error => {
        this.notes.add(new Notification('Уважаемый клиент!', `${error.error.errorMsg[0]}`));
      }
    );
  }

  onResendSms() {
    clearInterval(this.countDown);
    if (this.isDisableResendSms) {
        return false;
    }
    this.isDisableResendSms = true;
    this.timer(this.timeout, 'ResendSms');

    const requestJson = {
      portfolio_id: this.portfolioId,
      type: 'resend'
    };
    this.subscriptions$.add(this.cabinetService.withdrawSmsConfirm(requestJson).subscribe(
      _ => {
      },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      }
    ));
  }

  sendToMail() {
    clearInterval(this.emailCountDown);
    this.isDisableResendEmail = true;
    this.timer(this.timeoutEmail, 'ResendEmail');

    const requestJson = {
      portfolio_id: this.portfolioId,
      type: 'mail'
    };
    this.subscriptions$.add(this.cabinetService.withdrawSmsConfirm(requestJson).subscribe(
      (_: any) => {
        this.timeoutEmail = _.timeout;
        this.notes.add(new Notification('Уважаемый клиент!', `Письмо с кодом отправлено вам на почту.`));
      }
    ));
  }

  backToPreviousPage() {
    if (this.method === "cancel") {
      this.step = 3;
    }
    this.previousStep = this.step;
    clearInterval(this.emailCountDown);
    clearInterval(this.countDown);
  }

  cancelWithdraw() {
    this.cabinetService.withdrawSmsRequest({portfolio_id: this.portfolioId, method: this.method}).subscribe((response: any) => {
      this.fileName = response.title;
      this.fileUrl = response.url;
    });
    this.step = 2;
    clearInterval(this.countDown);
    if (this.isDisableResendSms) {
        return false;
    }
    this.isDisableResendSms = true;
    this.timer(this.timeout, 'ResendSms');
    setTimeout(() => this.topOfPage.nativeElement.scrollIntoView(), 100);
  }

  timer(time: number = 45, toggle: string) {
    if (toggle === 'ResendSms') {
        this.counter = time;
        this.countDown = setInterval(() => {
            this.counter--;
            if (this.counter <= 0) {
              this.isDisableResendSms = false;
              clearInterval(this.countDown);
            }
        }, 1000);
    } else {
        this.counterEmail = time;
        this.emailCountDown = setInterval(() => {
            this.counterEmail--;
            if (this.counterEmail <= 0) {
              this.isDisableResendEmail = false;
              clearInterval(this.emailCountDown);
            }
        }, 1000);
    }
  }
  ngOnDestroy() {
    if (this.subscriptions$) {
      this.subscriptions$.unsubscribe();
    }
  }
}
