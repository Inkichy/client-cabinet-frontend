import { Component, ElementRef, OnInit, Input, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/core/services/api/profile.service';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import {CabinetService} from '../../core/services/api/cabinet.service';
import { parseErrors } from '../../core/utls/parse-error.utls';

@Component({
    selector: 'app-investment-profile',
    templateUrl: 'investment-profile-form.component.html',
    styleUrls: ['investment-profile-form.component.less']
})
export class InvestProfileFormComponent implements OnInit {
    private readonly subscriptions$: Subscription = new Subscription();
    isLoadingInvestmentClient = false;
    investmentClientStep = 1;
    errorsInvestmentClient = [];
    isConfirmInvestmentProfile = false;
    needSmsConfirmation = false;
    smsCode: string;
    @Input() paymentMode = false;
    @ViewChild('firstStep') firstStep: ElementRef;
    @ViewChild('smsConfirmation') smsConfirmation: ElementRef;
    @ViewChild('finalStep') finalStep: ElementRef;

    investorTypeDictionary = [
        'Квалифицированный инвестор',
        'Неквалифицированный инвестор',
    ];
    ageDictionary = [
        'до 20 лет',
        'от 20 до 50 лет',
        'старше 50'
    ];

    averageMonthlyIncomeDictionary = [
        'Среднемесячные расходы превышают среднемесячные доходы',
        'Среднемесячные расходы примерно соответствуют среднемесячным доходам',
        'Среднемесячные доходы превышают среднемесячные расходы'
    ];

    savingDictionary = [
        'Сбережения превышают стоимость активов для инвестирования',
        'Сбережения не превышают стоимость активов для инвестирования',
        'Сбережения отсутствуют'
    ];

    financialLiabilitiesDictionary = [
        'Финансовые обязательства отсутствуют и не планируются',
        'Финансовые обязательства имеются либо планируются'
    ];

    educationDictionary = [
        'Есть высшее финансово-экономическое образование, степень по указанному направлению и/или cсертификаты CFA, FRM, аттестаты',
        'Нет высшего финансово-экономического образования и/или сертификата CFA, FRM, аттестата'
    ];

    investmentExperienceDictionary = [
        'отсутствует',
        'до 1 года',
        'от 1 года до 3 лет',
        'от 3 лет'
    ];

    investmentAssetsDictionary = [
        'опыт отсутствует',
        'облигации/депозиты',
        'акции',
        'производные финансовые инструменты, маржинальная торговля'
    ];

    reduceCostInvestmentDictionary = [
        'отсутствует',
        'снижение стоимости до 30%',
        'снижение стоимости более 30%'
    ];

    investmentPortfolioShareDictionary = [
        'более 30%',
        'от 15 % до 30%',
        'менее 15%',
        '0%'
    ];

    investmentHorizonDictionary = [
        '1 год',
        '2 года',
        '3 года',
        'более 3 лет'
    ];

    investmentPurposeDictionary = [
        'Получать доходность, сопоставимую с банковскими депозитами. Риски снижения стоифмости инвестиций минимальны.',
        'Получать доходность выше банковских депозитов. Допустимо незначительное снижение стоимости портфеля.',
        'Получать умеренную доходность за счет прироста стоимости диверсифицированного портфеля. Допустимо умеренное снижение стоимости портфеля.',
        'Получать высокую доходность на долгосрочном временном горизонте. Допустимо значительное снижение стоимости портфеля.'
    ];

    investmentReturnDictionary = [
      'Должна быть выше суммы первоначальных инвестиций, без учета налогов и вознаграждения инвестиционного советника (риска дефолта контрагента/эмитента).',
      'Должна быть равна сумме первоначальных инвестиций, без учета налогов и вознаграждения инвестиционного советника (риска дефолта контрагента/эмитента).',
      'Может быть ниже суммы первоначальных инвестиций, без учета налогов и вознаграждения инвестиционного советника (риска дефолта контрагента/эмитента).'
    ];

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
        sms_code: new FormControl(null),
    });

    profileName: string;
    text: string;

    errors = [];

    constructor(private cabinetService: CabinetService,
                private profile: ProfileService,
                private elementRef: ElementRef,
                private scrollToService: ScrollToService) { }

    ngOnInit() {
        this._getInvestmentProfile();
    }

    private _getInvestmentProfile() {
        this.profile.getInvestmentClient().subscribe((investmentClient) => {
            if (investmentClient.investor_type) {
                this.needSmsConfirmation = true;
            }
            this.formInvestmentClient.patchValue(investmentClient);
            this.profileName = investmentClient.profile;
            this.text = investmentClient.description;
        },
        error => {
            this.errors = parseErrors(error.error.errorMsg);
        });
    }

    onSubmitInvestmentClient() {
        this.formInvestmentClient.markAllAsTouched();
        if (this.formInvestmentClient.invalid) {
            this.scrollToInvalidField();
        } else {
            if (!this.smsCode && this.needSmsConfirmation) {
                this.investmentClientStep = 2;
                this.requestSmsCode();
                this.scrollToSmsStep();
            } else {
                this.errorsInvestmentClient = [];
                this.isLoadingInvestmentClient = true;
                this.formInvestmentClient.controls.sms_code.setValue(this.smsCode);
                this.subscriptions$.add(this
                  .profile
                  .saveInvestmentClient(this.formInvestmentClient.getRawValue())
                  .subscribe((response) => {
                      this.profileName = response.profile;
                      this.text = response.description;
                      this.isLoadingInvestmentClient = false;
                      this.investmentClientStep = 3;
                      this.scrollToFinalStep();

                  }, (errors) => {
                      this.smsCode = '';
                      this.isLoadingInvestmentClient = false;
                      this.errorsInvestmentClient = errors;
                      this.investmentClientStep = 1;
                      this.scrollToFirstStep();
                  })
                );
            }
        }
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
                const config: ScrollToConfigOptions = {
                    target: element.item(0),
                    offset: -100
                };
                this.scrollToService.scrollTo(config);
            }
        }, 200);
    }

    private scrollToFirstStep() {
        setTimeout(() => this.firstStep.nativeElement.scrollIntoView(), 100);
    }

    private scrollToSmsStep() {
        setTimeout(() => this.smsConfirmation.nativeElement.scrollIntoView(), 100);
    }

    private scrollToFinalStep() {
        setTimeout(() => this.finalStep.nativeElement.scrollIntoView(), 100);
    }

    requestSmsCode() {
        this.cabinetService.smsRequest().subscribe(() => {},
        error => {
            this.errors = parseErrors(error.error.errorMsg);
        });
    }
}
