import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../core/services/api/profile.service';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CabinetService } from '../../core/services/api/cabinet.service';
import { TMService } from '../../core/services/api/tm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { CabinetPortfolioModel, CabinetUserPortfolioModel, RatesModel } from '../../core/models/cabinet-data.model';
import { GetImageService } from '../../core/services/get-image.service';
import { ProcessDataService } from '../../core/services/process-data.service';
import { ProductConfigService } from '../../core/services/config/products';
import { ProductsConfig } from '../../core/models/configs';
import { QBFormGroup } from '../../core/models/forms';
import { BankResponseModel } from 'src/app/directives/dadata/dadata.model';

@Component({
  selector: 'app-tm-purchase',
  templateUrl: './tm-purchase.component.html',
  styleUrls: ['./tm-purchase.component.less']
})
export class TmPurchaseComponent implements OnInit, OnDestroy {

  @ViewChild('form1', {static: false}) form1: ElementRef;
  @ViewChild('form2', {static: false}) form2: ElementRef;
  @ViewChild('form3', {static: false}) form3: ElementRef;
  @ViewChild('form4', {static: false}) form4: ElementRef;
  @ViewChild('formIISElem', {static: false}) formIISElem: ElementRef;
  @ViewChild('form5', {static: false}) form5: ElementRef;
  @ViewChild('form6', {static: false}) form6: ElementRef;
  @ViewChild('sumForm', {static: false}) sumForm: ElementRef;
  @ViewChild('paymentFooter', {static: false}) paymentFooter: ElementRef;
  @ViewChild('paymentFooterSms', {static: false}) paymentFooterSms: ElementRef;

  private readonly subscriptions$: Subscription = new Subscription();

  MODE_PURCHASE = 1;
  MODE_CHANGE_TARIFF = 2;
  // rates: RatesModel;
  currency: string;

  product: CabinetPortfolioModel;
  oldProduct: CabinetPortfolioModel;
  oldProductInPortfolio: CabinetUserPortfolioModel;

  purchaseMethod = 'purchase';
  isLoadingPurchase = false;

  errorsPurchase = [];

  personalDataChanged = false;
  personalDataSmsConfirmation = false;

  touchPersonalData$: Subject<any> = new Subject<any>();

  operationFormSum: QBFormGroup;
  operationFormContacts: QBFormGroup;
  operationFormPassport: QBFormGroup;
  operationFormAdditional: QBFormGroup;
  operationFormBank: QBFormGroup;
  operationFormIIS: QBFormGroup;
  operationFormQuiz: QBFormGroup;
  operationFormInvestment: QBFormGroup;

  personalSmsConfirmationForm: FormGroup = new FormGroup({
    sms: new FormControl(null, [Validators.required]),
  });

  formSum: FormGroup = new FormGroup({
    sum: new FormControl(null, [Validators.required]),
  });

  formContacts: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
  });

  formPassport: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    patronymic: new FormControl(null, [Validators.required]),
    birthDate: new FormControl(null, [Validators.required]),
    passportSeries: new FormControl(null, [Validators.required]),
    passportNumber: new FormControl(null, [Validators.required]),
    passportIssuedBy: new FormControl(null, [Validators.required]),
    passportIssueDate: new FormControl(null, [Validators.required]),
    passportIssueId: new FormControl(null, [Validators.required]),
    birthPlace: new FormControl(null, [Validators.required]),
    passportScan: new FormControl([], [Validators.required])
  });

  scansImageArray: string[] = [];
  imagesId: number[] = [];
  imagesArray: FileList;

  formAdditionalInformation: FormGroup = new FormGroup({
    documentInn: new FormControl(null, [Validators.required]),
    documentSnils: new FormControl(null, [Validators.required]),
    actualAddr: new FormControl(null, [Validators.required]),
    postAddr: new FormControl(null, [Validators.required])
  });

  formBank: FormGroup = new FormGroup({
    bankBik: new FormControl(null, [Validators.required]),
    bankName: new FormControl(null, [Validators.required]),
    bankAccount: new FormControl(null, [Validators.required, Validators.minLength(20)]),
    bankCorr: new FormControl(null, [Validators.required])
  });

  formIIS: FormGroup = new FormGroup({
    individual_investment_account_is_opened: new FormControl(null, [Validators.required]),
    tax_deduction_type: new FormControl(null, [Validators.required]),
    securities_variant: new FormControl(null, [Validators.required]),
  });

  formPersonalDataInvalid = false;

  formInvestmentClient: FormGroup = new FormGroup({
    investor_type: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    average_monthly_income: new FormControl(null, [Validators.required]),
    saving: new FormControl(null, [Validators.required]),
    financial_liabilities: new FormControl(null, [Validators.required]),
    education: new FormControl(null, [Validators.required]),
    investment_experience: new FormControl(null, [Validators.required]),
    investment_assets: new FormControl(null, [Validators.required]),
    reduce_cost_investment: new FormControl(null, [Validators.required]),
    investment_portfolio_share: new FormControl(null, [Validators.required]),
    investment_horizon: new FormControl(null, [Validators.required]),
    investment_purpose: new FormControl(null, [Validators.required]),
    investment_return: new FormControl(null, [Validators.required]),
  });

  isConfirmPersonalGlobal = false;
  showInvestmentProfile = false;
  config: ProductsConfig;
  mode: number;

  operationForms = [];

  constructor(
    private profile: ProfileService,
    private tMService: TMService,
    private elementRef: ElementRef,
    private imageService: GetImageService,
    private router: Router,
    private route: ActivatedRoute,
    private configService: ProductConfigService,
    private processDataService: ProcessDataService,
    private cabinetService: CabinetService
    ) {
  }

  ngOnInit() {
    this.mode = this.MODE_PURCHASE;
    this.formSum.get('sum').setValue(10);
    this.fetchData();
    this.constructFormsData();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  constructFormsData() {
    this.operationFormSum = new QBFormGroup(
      this.sumForm,
      this.formSum
    );
    this.operationFormContacts = new QBFormGroup(
      this.form1,
      this.formContacts
    );
    this.operationFormPassport = new QBFormGroup(
      this.form2,
      this.formPassport
    );
    this.operationFormAdditional = new QBFormGroup(
      this.form3,
      this.formAdditionalInformation
    );
    this.operationFormBank = new QBFormGroup(
      this.form4,
      this.formBank
    );
    this.operationFormIIS = new QBFormGroup(
      this.formIISElem,
      this.formIIS
    );
    this.operationFormQuiz = new QBFormGroup(
      this.form5,
      null
    );
    this.operationFormInvestment = new QBFormGroup(
      this.form6,
      this.formInvestmentClient
    );

    this.operationForms = [];
    this.operationForms.push(this.operationFormContacts);
    this.operationForms.push(this.operationFormPassport);
    this.operationForms.push(this.operationFormAdditional);
    this.operationForms.push(this.operationFormBank);
    this.operationForms.push(this.operationFormIIS);
    this.operationForms.push(this.operationFormQuiz);
    this.operationForms.push(this.operationFormInvestment);
  }

  onSetBank(data: BankResponseModel) {
    this.formBank.get('bankName').setValue(data.data.name.payment);
    this.formBank.get('bankCorr').setValue(data.data.correspondent_account);
    this.formBank.get('bankBik').setValue(data.data.bic);
  }

  onSubmitForm(form: QBFormGroup) {
    form.form.markAllAsTouched();

    if (form.form.invalid) {
      this.scrollToInvalidField();
    } else {
      this.personalDataChanged = true;
      this.allClose();
      this.next();
    }
  }

  onSubmitFormFinal(method: string) {
    this.purchaseMethod = method;
    this.allClose();

    if (this.personalDataChanged) {
      let values = {};
      this.operationForms.forEach((el: QBFormGroup) => {
        if (el.form) {
          values = [values, el.form.getRawValue()].reduce((r, o) => {
            Object.keys(o).forEach((k) => {
              r[k] = o[k];
            });
            return r;
          }, {});
        }
      });

      this.isLoadingPurchase = true;
      this.personalDataSmsConfirmation = true;
      if (values['phone']) {
        values['phone'] = this.formatPhone(values['phone']);
      }
      this.subscriptions$.add(this
        .profile
        .saveUserInfo(values)
        .subscribe((response) => {
          this.isLoadingPurchase = false;
          if (response.success) {

          } else {
            let errors = [];
            if (response.errorMsg && typeof response.errorMsg[0] !== 'string') {
              for (const k in response.errorMsg) {
                errors.push(response.errorMsg[k]);
              }
            } else {
              errors = response.errorMsg;
            }
            this.errorsPurchase = errors;
            this.personalDataSmsConfirmation = false;
            this.scrollToTop();
          }
        }, (errors) => {
          this.isLoadingPurchase = false;
          this.errorsPurchase = ['Непредвиденная ошибка сервера'];
          this.personalDataSmsConfirmation = false;
        })
      );

      this.paymentFooterSms.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      switch (method) {
        case 'purchase':
          this.purchase();
          break;
        case 'changeTariff':
          this.changeTariff();
          break;
      }

    }
  }

  personalSMSConfirmation() {
    if (this.personalSmsConfirmationForm.invalid) {

    } else {
      this.isLoadingPurchase = true;
      this.subscriptions$.add(this
        .profile
        .saveConfirm(this.personalSmsConfirmationForm.get('sms').value)
        .subscribe((response) => {
          switch (this.purchaseMethod) {
            case 'purchase':
              this.purchase();
              break;
            case 'changeTariff':
              this.changeTariff();
              break;
          }
        }, (errors) => {
          this.isLoadingPurchase = false;
          this.errorsPurchase = ['Непредвиденная ошибка сервера'];
        })
      );
    }
  }

  onSubmitContacts() {
    this.onSubmitForm(this.operationFormContacts);
  }

  onSubmitPassport() {
    this.formPassport.get('passportScan').setValue(this.imagesId);
    this.onSubmitForm(this.operationFormPassport);
  }

  onSubmitAdditionalInformation() {
    this.onSubmitForm(this.operationFormAdditional);
  }

  onSubmitBankData() {
    this.onSubmitForm(this.operationFormBank);
  }

  onSubmitIIS() {
    this.onSubmitForm(this.operationFormIIS);
  }

  success(event) {
    if (event) {
      this.allClose();
      if (this.form6) {
        this.next();
      }
    }
  }

  changeTariff() {
    let invalid = false;

    this.allClose();

    if (this.formInvestmentClient.invalid) {
      this.formInvestmentClient.markAllAsTouched();
      invalid = true;
      this.operationFormInvestment.open = true;
    }

    if (invalid) {
      setTimeout(() => {
        this.scrollToInvalidField();
      }, 500);

      return false;
    }

    this.isLoadingPurchase = true;

    this.profile.saveEdo().subscribe(_ => {
      this.subscriptions$.add(this
        .tMService
        .purchase({
          sum: this.formSum.get('sum').value,
          product: this.product.ID,
          currency: this.currency,
          userProductToChange: +this.oldProductInPortfolio.id
        })
        .subscribe((response) => {
          if (response.success === true) {
            this.isLoadingPurchase = false;
            this.processDataService.saveDocuments(response.data.documents);
            this.router.navigate(['/tm-purchase-step-two'], {
              queryParams: {
                id: response.data.product,
                product: this.product.ID,
                old: this.oldProductInPortfolio.id
              }
            });
          } else {
            this.isLoadingPurchase = false;
            this.personalDataSmsConfirmation = false;
            this.errorsPurchase = response.errorMsg;
            this.scrollToTop();
          }
        }));
    });
  }

  purchase() {
    if (!this.product) {
      return false;
    }

    this.allClose();
    this.touchPersonalData$.next();
    const invalid = this.next();

    if (!invalid) {
      return false;
    }
    this.isLoadingPurchase = true;
    this.profile.saveEdo().subscribe(_ => {
      this.subscriptions$.add(this
        .tMService
        .purchase({
          sum: this.formSum.get('sum').value,
          currency: this.currency,
          product: this.product.ID
        })
        .subscribe((response) => {
          if (response.success === true) {
            this.isLoadingPurchase = false;
            this.processDataService.savePaymentSum(this.formSum.get('sum').value);
            this.processDataService.savePaymentCurrency(this.currency);
            this.processDataService.saveDocuments(response.data.documents);
            this.router.navigate(['/tm-purchase-step-two'], {
              queryParams: {
                id: response.data.agreement,
                product: this.product.ID
              }
            });
          } else {
            this.errorsPurchase = response.errorMsg;
            this.isLoadingPurchase = false;
            this.personalDataSmsConfirmation = false;
            this.scrollToTop();
          }
        }));
    });
  }

  private allClose() {
    this.operationForms.forEach((el: QBFormGroup) => {
      el.open = false;
    });
  }

  private next(first: boolean = false) {
    let invalid = false;
    this.operationForms.forEach((el: QBFormGroup) => {
      if (invalid) {
        return;
      }
      if (el.form) {
        el.form.markAllAsTouched();
        if (el.form.invalid) {
          invalid = true;
          if (el.element && el.element.nativeElement) {
            if (!first) {
              this.openAndScroll(el);
            }
          }
        }
      }
    });

    if (!first && !invalid && this.paymentFooter) {
      this.paymentFooter.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return invalid;
  }

  scrollToTop() {
    this.sumForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  private openAndScroll(el: QBFormGroup) {
    el.open = true;

    setTimeout(() => {
      el.element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  private scrollToInvalidField() {
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
        element.item(0).scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  }

  private subscribePortfolio() {
    const id = this.route.snapshot.paramMap.get('id') || false;
    if (!id) {
      this.router.navigate(['/main']);
    }
    this.subscriptions$.add(this
      .cabinetService
      .getPortfolioById(id)
      .subscribe(item => {
        this.product = item;
        this.formSum.get('sum').setValidators(Validators.min(item.MINSUMM));
        this.formSum.get('sum').setValue(item.MINSUMM);
        this.currency = item.currencys[0];
        this.showInvestmentProfile = this.config.productsForInvestmentProfile.indexOf(this.product.CODE) > 1;

        setTimeout(() => {
          this.constructFormsData();
          this.next(true);
        }, 100);
      })
    );
  }

  private subscribePortfolioForChangeTariff() {
    const id = this.route.snapshot.paramMap.get('id') || false;
    if (!id) {
      this.router.navigate(['/main']);
    }

    this.subscriptions$.add(this
      .cabinetService
      .getUserPortfolioById(id)
      .subscribe(item => {
        if (item) {
          this.oldProductInPortfolio = item;
          this.formSum.get('sum').setValue(Math.floor(this.getTotalAmount(item) + item.freeMoney));

          return this.cabinetService.getPortfolioById(item.portfolioId).subscribe(
            oldProduct => {
              this.oldProduct = oldProduct;
              return this.cabinetService.getTariffForChange(oldProduct).subscribe(
                newProduct => {
                  this.product = newProduct;
                  this.currency = newProduct.currencys[0];
                  this.product.currencys = [this.currency];
                  this.showInvestmentProfile = this.config.productsForInvestmentProfile.indexOf(newProduct.CODE) > 1;

                  setTimeout(() => {
                    this.constructFormsData();
                    this.next(true);
                  }, 100);
                }
              );
            }
          );
        }
      })
    );
  }

  isChangeTariff() {
    return this.mode === this.MODE_CHANGE_TARIFF;
  }

  getImage(product: CabinetPortfolioModel, type: string) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }

    return '';
  }

  private fetchData() {
    const getInvestmentClient$ = this.profile.getInvestmentClient();
    const mainData$ = this.cabinetService.getDataObservable();
    const config$ = this.configService.loadConfig();

    return this.subscriptions$.add(combineLatest([
      getInvestmentClient$,
      mainData$,
      config$
    ])
      .subscribe(([investmentClient, main, config]) => {
        if (!main) {
          return;
        }

        this.formContacts.patchValue({
          phone: main.client.phone.replace(new RegExp('/^[0-9]+/'), '').slice(1),
          email: main.client.email
        });
        this.formPassport.patchValue(Object.assign({}, main.client, main.client.passport));

        if (main.client.passportScan) {
          this.imagesId = this.imagesId.concat(main.client.passportScan);
        }

        for (const id of this.imagesId) {
          if (id) {
            this.scansImageArray.push('url(' + this.imageService.getImageUrl(0, id.toString(), 'USER') + ')');
          }
        }

        const additionalInfo = {
          documentInn: main.client.documentInn,
          documentSnils: main.client.documentSnils,
          actualAddr: main.client.actualAddr,
          postAddr: main.client.postAddr
        };

        this.formAdditionalInformation.patchValue(additionalInfo);
        this.formBank.patchValue(main.client.requisites);
        this.formInvestmentClient.patchValue(investmentClient);
        // this.rates = main.rates;
        this.config = config;

        if (this.route.snapshot.data.mode) {
          this.mode = this.route.snapshot.data.mode;
        }

        switch (this.mode) {
          case this.MODE_PURCHASE:
            this.subscribePortfolio();
            break;
          case this.MODE_CHANGE_TARIFF:
            this.subscribePortfolioForChangeTariff();
            break;
        }

        if (this.isIIS()) {
          this.formIIS.get('individual_investment_account_is_opened').setValue(true);
        }
      })
    );
  }

  personalDataValidation(isValid) {
    if (isValid) {
      this.operationFormQuiz.open = false;
    }
    this.formPersonalDataInvalid = !isValid;
  }

  formatPhone(phone: string) {
    if (phone && phone.length === 10) {
      return '+7 (' + phone[0] + phone[1] + phone[2] + ') '
        + phone[3] + phone[4] + phone[5] + '-' + phone[6] + phone[7]
        + '-' + phone[8] + phone[9];
    }

    return '';
  }

  getCurrencyTitle(currency: string) {
    if (currency) {
      switch (currency.toUpperCase()) {
        case 'RUR':
          return 'рублей';
        case 'USD':
          return 'долларов США';
      }
    }
  }

  setCurrency(cur) {
    this.currency = cur.toUpperCase();
    return false;
  }

  getTotalAmount(item: CabinetUserPortfolioModel) {
    let sum = 0;

    if (item && item.amount) {
      for (const k in item.amount) {
        if (k === 'RUR') {
          sum += +item.amount[k];
        } else {
          sum += +item.amount[k] * item.rates[k];
        }
      }
    }
    return sum;
  }

  removeFile(i: number) {
    this.scansImageArray.splice(i, 1);
    this.imagesId.splice(i, 1);
  }

  public changeImage(event) {
    if (event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.imagesArray = files;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.scansImageArray.push('url(' + e.target.result + ')');
        };
        reader.readAsDataURL(files[0]);
        this.uploadFile();
      }
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.imagesArray[0], this.imagesArray[0].name);
    this.operationFormPassport.loading = true;
    this.cabinetService.uploadFile(formData).subscribe((data: { id: number[] }) => {
      this.operationFormPassport.loading = false;
      this.imagesId = this.imagesId.concat(data.id);
    });
  }

  isIIS() {
    return this.product && this.product.PARENT_ID !== '';
  }

  disabledRadioClick(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  updateValue($event, input) {
    input.setValue($event.value);
  }
}
