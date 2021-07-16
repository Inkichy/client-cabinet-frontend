import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CabinetDataModel, CabinetPortfolioModel, CabinetUserPortfolioModel } from 'src/app/core/models/cabinet-data.model';
import { InvestmentRequestModel } from 'src/app/core/models/investment-request.model';
import { Notification } from '../../core/models/notification.model';
import { IpoService } from 'src/app/core/services/api/ipo.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { parseErrors } from 'src/app/core/utls/parse-error.utls';
import { CabinetService } from 'src/app/core/services/api/cabinet.service';
import { NavigationStart, Event, Router } from '@angular/router';
import * as moment from 'moment';

declare const $: any;
@Component({
  selector: 'ipo-assignment',
  templateUrl: './ipo-assignment.html',
  styleUrls: ['./ipo-assignment.less'],
})
export class IpoAssignmentModal implements OnInit {
  @Input() tickerName: string;
  @Input() portfolioId: string;
  @Input() pageType: string;
  @Output() addAssignmentRequest = new EventEmitter<InvestmentRequestModel>();

  ipoData: InvestmentRequestModel = {
    status: '',
    id: 0,
    product: '',
    summ: '',
    createDateTime: ''
  };
  ipoDropDown = [];
  countDown: any;
  counter: number;
  counterEmail: number;
  deadline = '';
  emailCountDown: any;
  errors = [];
  ipoProducts = [];
  isAllRequest = false;
  isDisableResendEmail = false;
  isDisableResendSms = false;
  isDocumentsConfirm = false;
  isDocumentsReady = false;
  isDocumentsSpecConfirm = false;
  isDocumentsSpecReady = false;
  isError = false;
  isLoading = false;
  isMoneyTransferRequest = false;
  isDocumentShown = false;
  isSent = false;
  isSpecConfirm = false;
  isrequestComplete = false;
  portfolioItem: CabinetPortfolioModel;
  productInstalled: boolean;
  requestData = {};
  smsError = false;
  timeout: number;
  user: CabinetDataModel;
  userPortfolioItem: CabinetUserPortfolioModel;

  formConfirm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  formAssignment: FormGroup = new FormGroup({
    IpoProduct: new FormControl(null, [Validators.required]),
    AssignmentSumm: new FormControl(null, [Validators.required, Validators.min(350000), Validators.pattern('^[0-9]+$')]),
  });

  constructor(
    private ipoService: IpoService,
    private notes: NotificationsService,
    private cabinetService: CabinetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cabinetService.dataSubject.subscribe(response => {
      this.user = response;
      this.timeout = response.config.timeout;
    });
    this.router.events.subscribe((evt: Event) => {
      if ((evt instanceof NavigationStart)) {
        $.fancybox.close();
      }
    });

    this.userPortfolioItem = this.user.userPortfolios.find((item) => {
      return item.id === this.portfolioId;
    });

    this.getIpoProducts();
    $(document).on('beforeClose.fb', () => {
      // doesn't trigger if a document is shown
      if (this.isDocumentShown) {
        // toggles on document close
        this.isDocumentShown = false;
      } else {
        // waits until fancybox fades completely and then resets the modal
        setTimeout(() => this.cancel(), 330);
      }
    });
  }

  convertResponseToUrl(data: ArrayBuffer): string {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    return url;
  }

  onFormAssignmentChanges() {
    this.formAssignment.reset();
    if (this.pageType === 'notices') {
      const inputValue = this.ipoProducts.find(item => {
        return item.value[0] === this.tickerName;
      });
      if (inputValue) {
        this.formAssignment.patchValue({
          IpoProduct: inputValue.id
        });
        this.deadline = String(inputValue.deadline);
      }
    } else if (this.pageType === 'online-request') {
      this.deadline = '';
    }
  }

  onTickerChanges(event: any): void {
    const inputValue = this.ipoProducts.find(item => {
      return item.id === event.value;
    });
    this.deadline = String(inputValue.deadline);
  }

  getIpoProducts() {
    this.ipoService.getIpoList().subscribe((response) => {
      this.ipoProducts = response;
      this.ipoProducts = this.ipoProducts.map(item => {
        item.deadline = moment.unix(item.deadline).locale('ru').format('h:mm Do MMMM YYYY');
        return item;
      });
      this.setIpoProducts();
    });
  }

  setIpoProducts() {
    this.ipoDropDown = this.ipoProducts.map((item) => ({
      label: item.name,
      value: item.id,
    }));
  }

  cancel() {
    this.isSent = false;
    this.isrequestComplete = false;
    this.isDocumentsConfirm = false;
    this.isDocumentsSpecConfirm = false;
    this.isDocumentsReady = false;
    this.isDocumentsSpecReady = false;
    this.isSpecConfirm = false;
    this.isMoneyTransferRequest = false;
    clearInterval(this.countDown);
    clearInterval(this.emailCountDown);
    this.isDisableResendEmail = false;
    this.formConfirm.reset();
    this.formAssignment.reset();
    this.onFormAssignmentChanges();
    this.errors = [];
  }

  backToSpec() {
    this.isDocumentsSpecConfirm = false;
    this.isDocumentsReady = false;
    this.isSpecConfirm = false;
    this.isMoneyTransferRequest = false;
  }

  popUpClose() {
    $.fancybox.close();
  }

  createAssignment() {
    const rfkId = this.formAssignment.get('IpoProduct').value;

    const assignmentData = {
      portfolioId: +this.userPortfolioItem.id,
      rfkId,
      summ: this.formAssignment.get('AssignmentSumm').value,
    };

    this.isLoading = true;
    this.isDocumentsSpecReady = true;
    this.isSent = true;

    this.ipoData = {
      ...this.ipoData,
      product: this.ipoDropDown.find(el => el.value === rfkId).label,
      summ: this.formAssignment.get('AssignmentSumm').value
    };

    this.ipoService.createAssignment(assignmentData).subscribe(
      response => {
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Во время отправки данных произошла ошибка. Попробуйте еще раз.`
          )
        );
        this.cancel();
      }
    );
  }

  getAssignmentDocument(document: string): void {
    const assignmentData = {
      portfolioId: +this.userPortfolioItem.id,
      document: document,
    };
    this.isLoading = true;
    this.ipoService.getAssignmentDocument(assignmentData).subscribe(
      response => {
        this.isLoading = false;
        $.fancybox.open({
          src: this.convertResponseToUrl(response),
          type: 'iframe',
          opts: {
            afterLoad: () => this.isDocumentShown = true
          },
        });
      },
      error => {
        this.isLoading = false;
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Во время отправки данных произошла ошибка. Попробуйте еще раз.`
          )
        );
      }
    );
  }


  confirmSpec() {
    if (!this.isMoneyTransferRequest) {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Ошибка. oбратитесь к финансовому советнику`
          )
        );
        this.popUpClose();
      }, 3000);
    } else {
      this.isDocumentsSpecConfirm = true;
      this.isDocumentsReady = true;
    }
  }


  createAssignmentSms() {
    this.isLoading = true;

    this.ipoService.createAssignmentSms().subscribe(
      response => {
        this.isLoading = false;
        this.isDocumentsConfirm = true;
        this.isDisableResendSms = true;
        this.timer(this.timeout, 'ResendSms');
      },
      error => {
        this.isLoading = false;
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Во время отправки данных произошла ошибка. Попробуйте еще раз.`
          )
        );
        this.backToSpec();
      }
    );
  }

  onSubmitSms() {
    this.isLoading = true;
    this.ipoService
      .createAssignmentConfirm({
        code: this.formConfirm.get('code').value
      })
      .subscribe(
        (response: any) => {
          this.isLoading = false;
          this.isrequestComplete = true;
          if (response.success === true) {
            this.formAssignment.reset();
            this.addAssignmentRequest.emit({
              ...this.ipoData,
              status: 'Подписан',
              id: response.id,
              createDateTime: response.date
            });
          }

          if (response.success === false) {
            this.isLoading = false;
            this.errors = response.error.errorMsg;
          }
        },
        (error) => {
          this.isLoading = false;
          this.errors = error.error.errorMsg;
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
    this.ipoService.createAssignmentConfirm({ type: 'resend' }).subscribe(
      (error) => {
        clearInterval(this.emailCountDown);
        this.smsError = true;
        this.errors = parseErrors(error.error.errorMsg);
        this.ipoService.createAssignmentConfirm({ type: 'mail' }).subscribe();
      }
    );
  }

  sendToMail() {
    clearInterval(this.emailCountDown);
    this.isDisableResendEmail = true;
    this.timer(this.timeout, 'ResendEmail');
    this.ipoService.createAssignmentConfirm({ type: 'mail' }).subscribe((_: any) => {
      this.notes.add(
        new Notification(
          'Уважаемый клиент!',
          `Письмо с кодом отправлено вам на почту.`
        )
      );
    });
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
}
