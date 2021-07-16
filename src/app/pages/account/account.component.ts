import { Component, ElementRef, AfterViewInit, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import { CabinetUserPortfolioModel } from '../../core/models/cabinet-data.model';
import {MessageService} from 'primeng/components/common/messageservice';
import {ProfileService} from 'src/app/core/services/api/profile.service';
import {GetImageService} from 'src/app/core/services/get-image.service';
import {ProductConfigService} from '../../core/services/config/products';
import {QBFormGroup} from '../../core/models/forms';
import { parseErrors } from '../../core/utls/parse-error.utls';
import { NotificationsService } from '../../core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';


@Component({
  selector: 'app-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.less'],
  providers: [MessageService]
})
export class AccountComponent implements OnDestroy, OnInit, AfterViewInit {

  @ViewChild('settings') settingsForm: ElementRef;
  @ViewChild('clientForm') clientForm: ElementRef;
  @ViewChild('passportForm') passportForm: ElementRef;
  @ViewChild('bankForm') bankForm: ElementRef;
  @ViewChild('additionInfoForm') additionInfoForm: ElementRef;
  private readonly subscriptions$: Subscription = new Subscription();

  public image;
  public images = [];
  public scansImageArray = [];
  public imagesId: Array<number> = [];

  portfolio: CabinetPortfolioModel;
  brokerProductInPortfolio: CabinetUserPortfolioModel;

  isLoadingPassport = false;
  showInvestmentProfile = false;
  isLegalEntity = false;

  sum = 500000;

  formClient: FormGroup = new FormGroup({
    name: new FormControl(null),
    lastName: new FormControl(null),
    patronymic: new FormControl(null),
    birthDate: new FormControl(null),
    email: new FormControl(null),
    phone: new FormControl(null),
  });

  formPassport: FormGroup = new FormGroup({
    passportSeries: new FormControl(null),
    passportNumber: new FormControl(null),
    passportIssuedBy: new FormControl(null),
    passportIssueDate: new FormControl(null),
    passportIssueId: new FormControl(null),
    birthPlace: new FormControl(null),
    // passportScan: new FormControl([], [Validators.required]),
  });

  formAdditionalInformation: FormGroup = new FormGroup({
    legalEntityName: new FormControl(null),
    documentInn: new FormControl(null),
    documentSnils: new FormControl(null),
    KPP: new FormControl(null),
    actualAddr: new FormControl(null),
    postAddr: new FormControl(null),
    privateWord: new FormControl(null),
  });

  formBank: FormGroup = new FormGroup({
    bankBik: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    bankName: new FormControl(null, [Validators.required]),
    bankAccount: new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(20)]),
    bankCorr: new FormControl(null, [Validators.required, Validators.minLength(20), Validators.maxLength(20)]),
  });

  formConfirm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required]),
  });

  isOpenForm1 = false;
  isOpenForm2 = false;
  isOpenForm3 = false;
  isOpenForm4 = false;
  isSended = false;
  isDisableResendSms = false;
  isDisableResendEmail = false;

  operationFormClient: QBFormGroup;
  operationFormPassport: QBFormGroup;
  operationFormAdditional: QBFormGroup;
  operationFormBank: QBFormGroup;

  operationForms: QBFormGroup[] = [];

  clientInfoValues: any;
  passportValues: any;
  bankDataValues: any;
  additionalInfoValues: any;
  smsError = false;
  counter: number;
  counterEmail: number;
  timeout: number;
  timeoutEmail: number;
  countDown: any;
  emailCountDown: any;
  isLoading = false;
  errors = [];
  fullForm: any;

  constructor(private profile: ProfileService,
              private elementRef: ElementRef,
              private scrollToService: ScrollToService,
              private cabinetService: CabinetService,
              private configService: ProductConfigService,
              private getImageService: GetImageService,
              private notes: NotificationsService
  ) {

  }

  ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    this.cabinetService.getUserPortfolioType('Брокерское обслуживание').subscribe(
      (products) => {
        if (products.length) {
          this.brokerProductInPortfolio = products.pop();
        }
      }
    );
  }
    constructFormsData() {
    this.operationFormClient = new QBFormGroup(
      this.clientForm,
    this.formClient
    );
    this.operationFormPassport = new QBFormGroup(
      this.passportForm,
    this.formPassport
    );
    this.operationFormBank = new QBFormGroup(
      this.bankForm,
    this.formBank
    );
    this.operationFormAdditional = new QBFormGroup(
      this.additionInfoForm,
    this.formAdditionalInformation
    );

    this.operationForms.push(this.operationFormClient);
    this.operationForms.push(this.operationFormPassport);
    this.operationForms.push(this.operationFormAdditional);
    this.operationForms.push(this.operationFormBank);
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }


  private allClose() {
    this.isOpenForm1 = false;
    this.isOpenForm2 = false;
    this.isOpenForm3 = false;
    this.isOpenForm4 = false;
  }

  public changeImage(event) {
    if (event) {
      const files = event.target.files;
      console.log(event.target);
      if (files.length > 0) {
        this.image = files;
        this.images.push(event.target.value);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.scansImageArray.push('url(' + e.target.result + ')');
        };
        reader.readAsDataURL(files[0]);
        this.formPassport.get('passportScan').setValue(this.images);

      }
    }
  }

  onSetBank(data) {
    this.profile.getBank({'bik':data.target.value}).subscribe(
      items => {
        this.formBank.get('bankName').setValue(items.requisites.name.replace(/&quot;/g, '\"'));
        this.formBank.get('bankCorr').setValue(items.requisites.ks);
      },
      error => {
        this.formBank.get('bankName').setValue('');
        this.formBank.get('bankCorr').setValue('');
        this.errors = parseErrors(error.error.errorMsg);
      });
  }

  public scrollToInvalidField() {
    setTimeout(() => {
      let element = this
        .elementRef
        .nativeElement
        .getElementsByClassName('field_error');
      if (!element.length) {
        element = this
          .elementRef
          .nativeElement
          .getElementsByClassName('field__error');
      }

      if (element.length) {
        const config: ScrollToConfigOptions = {
          target: element.item(0),
          offset: -100
        };
        this.scrollToService.scrollTo(config);
      }
    }, 200);
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.image[0], this.image[0].name);
    this.profile.uploadFile(formData).subscribe((data: { id: number[] }) => {
      this.imagesId = this.imagesId.concat(data.id);
      this.operationFormPassport.form.patchValue({passportScan: this.imagesId});
    });
  }

    onSubmitClientInfo() {
      if (this.operationFormClient.form.value) {
        if (this.operationFormClient.form.invalid) {
            this.scrollToInvalidField();
        } else {
          this.clientInfoValues = this.operationFormClient.form.getRawValue();
          this.isOpenForm1 = false;
          this.openAndScroll('isOpenForm2', this.passportForm, 'start');
        }
      }
      return false;
  }

  onSubmitPassport() {
    if (this.operationFormPassport.form.value) {
      if (this.operationFormPassport.form.invalid) {
          this.scrollToInvalidField();
      } else {
        this.passportValues = this.operationFormPassport.form.getRawValue();
        this.isOpenForm2 = false;
        this.openAndScroll('isOpenForm3', this.bankForm, 'start');
      }
      }
    return false;
  }

  onSubmitBankData() {
    if (this.operationFormBank.form.value && this.operationFormBank.form.touched) {

      if (this.operationFormBank.form.invalid) {
          this.scrollToInvalidField();
      } else {
        this.bankDataValues = this.operationFormBank.form.getRawValue();
        this.isOpenForm3 = false;
        this.openAndScroll('isOpenForm4', this.additionInfoForm, 'start');
      }

      }
    return false;
  }

  onSubmitAdditionalInformation() {
    if (this.operationFormAdditional.form.value && this.operationFormAdditional.form.touched) {
      console.log(this.operationFormAdditional.form);
      if (this.operationFormAdditional.form.invalid) {
          this.scrollToInvalidField();
      } else {
        this.additionalInfoValues = this.operationFormAdditional.form.getRawValue();
        this.isOpenForm4 = false;
      }

      }
    return false;
  }

  saveChanges() {
    this.isSended = true;
    this.scrollTo(this.settingsForm, 'start');
    clearInterval(this.countDown);
    this.fullForm = Object.assign({}, this.clientInfoValues, this.passportValues, this.bankDataValues, this.additionalInfoValues);
    console.log(this.fullForm);
    if (this.fullForm.birthDate) {
      this.fullForm.birthDate = this.convertDate(this.fullForm.birthDate);
    }
    if (this.fullForm.passportIssueDate) {
      this.fullForm.passportIssueDate = this.convertDate(this.fullForm.passportIssueDate);
    }
    if (this.fullForm.phone) {
      this.fullForm.phone = `7${this.fullForm.phone}`;
    }
    this.subscriptions$.add(this
      .profile
      .saveUserInfo(this.fullForm)
      .subscribe((response) => {
        this.allClose();
        this.timeout = response.timeout;
        this.timeoutEmail = response.timeout;
        this.isDisableResendSms = true;
        this.timer(this.timeout, 'ResendSms');
      }, (errors) => {
        this.notes.add(new Notification('Уважаемый клиент!', `Во время отправки данных произошла ошибка. Попробуйте еще раз.`));
        clearInterval(this.emailCountDown);
        this.cancel();
        this.errors = parseErrors(errors.error.errorMsg);
      })
    );
  }

  public close(i: number) {
    this.scansImageArray.splice(i, 1);
    this.imagesId.splice(i, 1);
  }


  private openAndScroll(param, box: ElementRef, target) {
    this[param] = true;
    this.scrollTo(box, target);
  }


  private fetchData() {
    // const getBank$ = this.profile.getBank();
    const mainData$ = this.cabinetService.getDataObservable();
    const productConfig$ = this.configService.loadConfig();
    this.subscriptions$.add(combineLatest([
        mainData$,
        productConfig$
      ])
        .subscribe(([main, config]) => {
          if (!main) {
            return;
          }

          if (main.client.isLegalEntity) {
            this.isLegalEntity = true;
          }
          for (const userProduct of main.userPortfolios) {
            const userProductTariff = main.portfolios.filter(_ => +_.ID === +userProduct.portfolioId).pop();
            if (userProductTariff && config.productsForInvestmentProfile.indexOf(userProductTariff.CODE) > -1) {
              this.showInvestmentProfile = true;
              break;
            }
          }

          if (main.client.passportScan) {
            this.imagesId = this.imagesId.concat(main.client.passportScan);
          }
          for (const id of this.imagesId) {
            this.scansImageArray.push('url(' + this.getImageService.getImageUrl(0, id.toString(), 'USER') + ')');
          }

          const additionalInfo = {
            legalEntityName: main.client.legalEntityName,
            documentInn: main.client.documentInn,
            documentSnils: main.client.documentSnils,
            KPP: main.client.KPP,
            actualAddr: main.client.actualAddr,
            postAddr: main.client.postAddr,
            privateWord: main.client.privateWord
          };

          this.formAdditionalInformation.patchValue(additionalInfo);
          this.formBank.patchValue(main.client.requisites);
          this.formPassport.patchValue(Object.assign({}, main.client, main.client.passport));
          if (main.client.phone && main.client.phone.length === 11) {
            main.client.phone = main.client.phone.substr(1);
          }
          this.formClient.patchValue(main.client);

          if (this.formClient.invalid) {
            this.openAndScroll('isOpenForm1', this.clientForm, 'center');
          }

          setTimeout(() => this.constructFormsData(), 100);
        })
    );
  }

  convertDate(rawDate) {
    if (rawDate.indexOf('.') > -1) {
      return rawDate;
    }
    return [
      rawDate[0] + '' + rawDate[1],
      rawDate[2] + '' + rawDate[3],
      rawDate[4] + '' + rawDate[5] + '' + rawDate[6] + '' + rawDate[7]
    ].join('.');
  }

  scrollTo(elem: ElementRef, target) {
    setTimeout(() => elem.nativeElement.scrollIntoView({behavior: 'smooth', block: target}), 100);
  }

  updateValue($event, input) {
    input.setValue($event.value);
  }

  cancel() {
    this.isSended = false;
    clearInterval(this.countDown);
    clearInterval(this.emailCountDown);
    this.isDisableResendEmail = false;
    this.scrollTo(this.settingsForm, 'start');
    this.formConfirm.reset();
  }

  onSubmitSms() {
    this.errors = [];
    this.isLoading = true;
    this.subscriptions$.add(
    this
        .profile
        .saveConfirm({code: this.formConfirm.get('code').value})
        .subscribe((_: any) => {
          this.isLoading = false;
          if (_.success === true) {
            this.notes.add(new Notification('Уважаемый клиент!', `Ваши данные отправлены на проверку.`));
            this.isSended = false;
            this.scrollTo(this.settingsForm, 'start');
            this.formConfirm.reset();
            this.operationFormClient.form.patchValue(this.fullForm);
            this.operationFormPassport.form.patchValue(this.fullForm);
            this.operationFormAdditional.form.patchValue(this.fullForm);
            this.operationFormBank.form.patchValue(this.fullForm);

          } else {

            this.errors = parseErrors(_.errorMsg);
          }
        })
    );

  }


  onResendSms() {
    clearInterval(this.countDown);
    if (this.isDisableResendSms) {
      return false;
    }
    this.isDisableResendSms = true;
    this.timer(this.timeout, 'ResendSms');
    this.subscriptions$.add(
    this
        .profile.saveConfirm({type: 'resend'})
        .subscribe((_: any) => {
          if (_.success === true) {
            this.timeout = _.timeout;
          } else {
            this.errors = parseErrors(_.errorMsg);
          }
        },
          error => {
            clearInterval(this.emailCountDown);
            this.smsError = true;
            this.errors = parseErrors(error.error.errorMsg);
            this.profile.saveConfirm({type: 'mail'}).subscribe((_: any) => {
              this.timeoutEmail = _.timeout;
            });
          })
    );

  }

  sendToMail() {
    clearInterval(this.emailCountDown);
    this.isDisableResendEmail = true;
    this.timer(this.timeoutEmail, 'ResendEmail');
    this.subscriptions$.add(
    this
    .profile.saveConfirm({type: 'mail'})
        .subscribe((_: any) => {
          this.timeoutEmail = _.timeout;
          this.notes.add(new Notification('Уважаемый клиент!', `Письмо с кодом отправлено вам на почту.`));
    })
    );
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
