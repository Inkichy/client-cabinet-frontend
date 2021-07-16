import {Component, ElementRef, Output, EventEmitter, Input, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {CabinetService} from 'src/app/core/services/api/cabinet.service';
import {FormGroup, FormControl, Validators, FormArray, AbstractControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {ProfileService} from 'src/app/core/services/api/profile.service';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {chunkArray} from '../../core/utls/chunk-array.utls';
import { parseErrors } from '../../core/utls/parse-error.utls';


interface QuestionElem {
  text: string;
  key: string;
}

@Component({
  selector: 'app-questionnaire',
  templateUrl: 'questionnaire.component.html',
  styleUrls: ['questionnaire.component.less']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  @Output('success') sendMessage = new EventEmitter();

  @Input() touch: Observable<any>;

  @Output() isValid = new EventEmitter<boolean>();

  @ViewChild('firstStep') firstStep: ElementRef;
  @ViewChild('smsConfirmation') smsConfirmation: ElementRef;
  @ViewChild('finalStep') finalStep: ElementRef;

  num = 1;
  step = 1;
  smsCode: string;
  activities: any;
  needSmsConfirmation = false;
  isConfirmPersonal = false;
  isLoadingPersonalDataConfirm = false;
  sendSmsDisabled = false;
  finStateDictionary = [
    'стабильное',
    'не стабильное',
    'критическое'
  ];

  activityDictionary = [
    'Административно-хозяйственная служба',
    'Телекоммуникации',
    'Транспорт',
    'Производство',
    'Строительство',
    'IT, телеком',
    'Маркетинг',
    'Туризм, рестораны',
    'Банки',
    'Медицина',
    'Юриспруденция',
    'Наука, образование',
    'Спорт, фитнес',
    'Автомобили',
    'Страхование',
    'Другое',
  ];

  businessReputationDictionary = [
    {
      text: 'Участие в судебных разбирательствах в качестве ответчика',
      key: 'court_proceedings_player'
    },
    {
      text: 'Наличие мер воздействия со стороны органов регулирования, налоговых и иных органов надзора',
      key: 'was_punished'
    },
    {
      text: 'Наличие государственных наград и различного рода поощрений',
      key: 'state_reward',
      advanced: [
        {
          text: 'государственные награды клиенты',
          key: 'state_reward_text'
        }
      ]
    },
    {
      text: 'Наличие непогашенных (просроченных) кредитов, задолженностей в банках',
      key: 'overdue_credits'
    },
    {
      text: 'Наличие отзывов, рекомендательных писем (указать и приложить):',
      key: 'recomendations',
      advanced: [
        {
          text: 'рекомендательные письма клиента',
          key: 'recomendations_text'
        },
        {
          text: 'Прикрепленные сканы рекомендательных писем',
          key: 'recomendations_files'
        }
      ]
    }
  ];

  imageUrls = {
    usa_citizenship_denial_scan: [],
    usa_citizenship_w9_scan: [],
    recomendations_files: [],
  };
  isImageUpload = false;


  characterCategoryDictionary = [
    {
      text: 'Клиент - иностранное публичное должностное лицо',
      key: 'character_category_public_char',
      advanced: [
        {
          text: 'Ваш работодатель',
          key: 'character_category_public_char_employer'
        },
        {
          text: 'Адрес вашего работодателя',
          key: 'character_category_public_char_employers_address'
        },
        {
          text: 'Ваша должность',
          key: 'character_category_public_char_position'
        }
      ]
    },
    {
      text: 'Клиент - должностное лицо публичных международных организаций',
      key: 'character_category_char_international_companaies',
      advanced: [
        {
          text: 'Ваш работодатель',
          key: 'character_category_char_international_companaies_employer'
        },
        {
          text: 'Адрес вашего работодателя',
          key: 'character_category_char_international_companaies_employers_address'
        },
        {
          text: 'Ваша должность',
          key: 'character_category_char_international_companaies_position'
        }
      ]
    },
    {
      // tslint:disable-next-line:max-line-length
      text: 'Клиент - лицо, замещающее (занимающее) государственные должности РФ, должности членов Совета директоров ЦБ РФ, должности федеральной государственной службы, назначение на которые и освобождение от которых осуществляются Президентом РФ или Правительством РФ, должности в ЦБ РФ, государственных корпорациях и иных организациях, созданных РФ на основании федеральных законов, включенные в перечни должностей, определяемые Президентом РФ',
      key: 'character_category_char_state_position',
      advanced: [
        {
          text: 'Ваш работодатель',
          key: 'character_category_char_state_position_employer'
        },
        {
          text: 'Адрес вашего работодателя',
          key: 'character_category_char_state_position_employers_address'
        },
        {
          text: 'Ваша должность',
          key: 'character_category_char_state_position_position'
        }
      ]
    },
    {
      // tslint:disable-next-line:max-line-length
      text: 'Клиент - родственник ПДЛ (супруг/супруга, мать/отец, сын/дочь, дедушка/бабушка, брат/сестра (полнородный или неполнородный), усыновитель/усыновленный)',
      key: 'character_category_relative_char',
      advanced: [
        {
          text: 'Степень родства',
          key: 'character_category_relative_char_degree_of_relationship'
        },
        {
          text: 'Ваш работодатель',
          key: 'character_category_relative_char_employer'
        },
        {
          text: 'Адрес вашего работодателя',
          key: 'character_category_relative_char_employers_address'
        },
        {
          text: 'Ваша должность',
          key: 'character_category_relative_char_position'
        }
      ]
    }
  ];

  usaCitizenshipParentDictionary = [
    {
      text: 'Не применимо (не рожден в США)',
      key: 'not_applicable'
    },
    {
      text: 'Не отказывался (гражданин США)',
      key: 'us_citizen'
    },
    {
      text: 'Форма W-9 предоставлена',
      key: 'w9_exists'
    },
    {
      text: 'Да, отказывался. Предоставлены документы, подтверждающие отказ',
      key: 'denial_docs_exists'
    }
  ];

  usaCitizenshipDictionary = [
    {
      text: 'Копия свидетельства об утрате гражданства США (по форме DS 4083 Бюро консульских дел Государственного департамент США)',
      key: 'usa_citizenship_refused_citizenship_lost'
    },
    {
      text: 'Письменное объяснение причины отказа от гражданства США',
      key: 'usa_citizenship_refused_citizenship_renounced'
    },
    {
      text: 'Письменное объяснение причины, неполучения гражданства США при рождении',
      key: 'usa_citizenship_refused_citizenship_not_receiving_after_birth'
    }
  ];

  usaCitizenshipDictionaryUsCitizen = [
    {
      text: 'Имеется вид на жительство в США',
      key: 'usa_citizenship_residence_permit'
    },
    {
      text: 'Имеется green card',
      key: 'usa_citizenship_green_card'
    }
  ];

  errorsPersonalData = [];
  isLoadingPersonalData = false;
  public variants;
  private readonly subscriptions$: Subscription = new Subscription();
  formPersonalData: FormGroup;

  errors = [];

  constructor(private cabinetService: CabinetService,
              private scrollToService: ScrollToService,
              private elementRef: ElementRef,
              private profile: ProfileService) {
  }

  ngOnInit() {

    this.activities = this.chunk(this.activityDictionary, 2);

    if (JSON.parse(localStorage.getItem('client'))) {
      this.variants = JSON.parse(localStorage.getItem('client')).client.quiz;
      if (this.variants) {
        this.needSmsConfirmation = true;
      }
      this._validation();
    }

    this._getVariants();

    if (this.touch) {
      this.touch.subscribe(
        () => this.formPersonalData.markAllAsTouched(),
        error => {
          this.errors = parseErrors(error.error.errorMsg);
      });
    }

    setInterval(() => {
      let index = 1;
      const elements = document.getElementsByClassName('js-number');

      for (const element of [].slice.call(elements)) {
        ((el, i) => {
          element.innerHTML = '' + i + '.';
        })(element, index);
        index++;
      }
    }, 1000);
  }

  private _validation() {
    this.formPersonalData = new FormGroup({
      finState: new FormControl(null, [Validators.required]),
      activity: new FormControl([]),
      activity_another: new FormControl(null),
      court_proceedings_player: new FormControl('false'),
      was_punished: new FormControl('false'),
      state_reward: new FormControl('false'),
      state_reward_text: new FormControl(null),
      overdue_credits: new FormControl('false'),
      recomendations: new FormControl('false'),
      recomendations_text: new FormControl(null),
      recomendations_files: new FormControl([]),
      character_category: new FormControl(null),
      character_category_variant: new FormControl(null),
      character_category_public_char: new FormControl('false'),
      character_category_public_char_employer: new FormControl(null),
      character_category_public_char_employers_address: new FormControl(null),
      character_category_public_char_position: new FormControl(null),
      character_category_char_international_companaies: new FormControl('false'),
      character_category_char_international_companaies_employer: new FormControl(null),
      character_category_char_international_companaies_employers_address: new FormControl(null),
      character_category_char_international_companaies_position: new FormControl(null),
      character_category_char_state_position: new FormControl('false'),
      character_category_char_state_position_employer: new FormControl(null),
      character_category_char_state_position_employers_address: new FormControl(null),
      character_category_char_state_position_position: new FormControl(null),
      character_category_relative_char: new FormControl('false'),
      character_category_relative_char_degree_of_relationship: new FormControl(null),
      character_category_relative_char_employer: new FormControl(null),
      character_category_relative_char_employers_address: new FormControl(null),
      character_category_relative_char_position: new FormControl(null),
      money_origin_text: new FormControl(null),
      is_foreign_resident: new FormControl(null),

      tax_foreign: new FormArray([
        new FormGroup({
          tax_foreign_country: new FormControl(null),
          tax_foreign_country_TIN: new FormControl(null),
        })
      ]),
      tax_resident_foreign_country_agreement_agree: new FormControl(null),
      usa_citizenship: new FormControl(null, [Validators.required]),
      usa_citizenship_variant: new FormControl(null),
      usa_citizenship_residence_permit: new FormControl('false'),
      usa_citizenship_green_card: new FormControl('false'),
      usa_citizenship_refused_citizenship_lost: new FormControl('false'),
      usa_citizenship_refused_citizenship_renounced: new FormControl('false'),
      usa_citizenship_refused_citizenship_not_receiving_after_birth: new FormControl('false'),
      usa_citizenship_denial_scan: new FormControl([]),
      usa_citizenship_w9_scan: new FormControl([]),
      cash_only: new FormControl('false'),
      securities: new FormControl('false'),
      securities_market_players_name_text: new FormControl(null),
      sms_code: new FormControl(null),
    });
    this._setValue();
    const dependencies = {
      activity: [
        {
          value: this.activityDictionary[this.activityDictionary.length - 1],
          required: [
            'activity_another'
          ]
        }
      ],
      state_reward: [
        {
          value: true,
          required: [
            'state_reward_text'
          ]
        }
      ],
      recomendations: [
        {
          value: true,
          required: [
            'recomendations_text'
          ]
        }
      ],
      character_category_public_char: [
        {
          value: true,
          required: [
            'character_category_public_char_employer',
            'character_category_public_char_employers_address',
            'character_category_public_char_position'
          ]
        }
      ],
      character_category_char_international_companaies: [
        {
          value: true,
          required: [
            'character_category_char_international_companaies_employer',
            'character_category_char_international_companaies_employers_address',
            'character_category_char_international_companaies_position'
          ]
        }
      ],
      character_category_char_state_position: [
        {
          value: true,
          required: [
            'character_category_char_state_position_employer',
            'character_category_char_state_position_employer_address',
            'character_category_char_state_position_position'
          ]
        }
      ],
      character_category_relative_char: [
        {
          value: true,
          required: [
            'character_category_relative_char_degree_of_relationship',
            'character_category_relative_char_employer',
            'character_category_relative_char_position',
            'character_category_relative_char_employers_address'
          ]
        }
      ],
      usa_citizenship: [
        {
          value: 'w9_exists',
          required: [
            'usa_citizenship_w9_scan'
          ]
        },
        {
          value: 'denial_docs_exists',
          required: [
            'usa_citizenship_variant'
          ]
        },
        {
          value: 'us_citizen',
          required: [
            'usa_citizenship_variant'
          ]
        }
      ],
      is_foreign_resident: [
        {
          value: true,
          required: [
            'tax_foreign',
            'tax_resident_foreign_country_agreement_agree'
          ]
        }
      ],
      character_category: [
        {
          value: true,
          required: [
            'character_category_variant',
            'money_origin_text'
          ]
        }
      ]
    };

    for (const i in dependencies) {
      const deps = dependencies[i];
      this.formPersonalData.get(i).valueChanges.subscribe((value) => {
        let fields = [];

        for (const depIndex in deps) {
          const dep = deps[depIndex];

          if (typeof value === 'object' && value.indexOf(dep.value) > -1 || dep.value === value) {
            for (const fieldIndex in dep.required) {
              this.formPersonalData.get(dep.required[fieldIndex]).setValidators(Validators.required);
            }
          } else {
            fields = fields.concat(dep.required);
          }
        }

        if (fields.length > 0) {
          for (const fieldIndex in fields) {
            if (this.formPersonalData.get(fields[fieldIndex])) {
              this.formPersonalData.get(fields[fieldIndex]).clearValidators();
              this.formPersonalData.get(fields[fieldIndex]).updateValueAndValidity({onlySelf: true});
            }
          }
        }
      },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });
    }

    this.isValid.emit(!this.formPersonalData.invalid);
  }

  private _setValue() {
    this.formPersonalData.patchValue({
      finState: this.variants.finState,
      activity: this.variants.activity,
      activity_another: this.variants.activity_another,

      court_proceedings_player: this.variants.court_proceedings_player === 'Нет' ? false :
        this.variants.court_proceedings_player === 'Да' ? true : null,
      was_punished: this.variants.was_punished === 'Нет' ? false : this.variants.was_punished === 'Да' ? true : null,
      state_reward: this.variants.state_reward === 'Нет' ? false : this.variants.state_reward === 'Да' ? true : null,
      state_reward_text: this.variants.state_reward_text,
      overdue_credits: this.variants.overdue_credits === 'Нет' ? false : this.variants.overdue_credits === 'Да' ? true : null,
      recomendations: this.variants.recomendations === 'Нет' ? false : this.variants.recomendations === 'Да' ? true : null,
      recomendations_text: this.variants.recomendations_text,
      recomendations_files: this.variants.recomendations_files,

      character_category: this.variants.character_category === 'Нет' ? false : this.variants.character_category === 'Да' ? true : null,

      character_category_public_char: this.variants.character_category_public_char === 'Нет' ? false :
        this.variants.character_category_public_char === 'Да' ? true : null,
      character_category_public_char_employer: this.variants.character_category_public_char_employer,
      character_category_public_char_employers_address: this.variants.character_category_public_char_employers_address,
      character_category_public_char_position: this.variants.character_category_public_char_position,

      character_category_char_international_companaies:
        this.variants.character_category_char_international_companaies === 'Нет' ? false :
          this.variants.character_category_char_international_companaies === 'Да' ? true : null,
      character_category_char_international_companaies_employer: this.variants.character_category_char_international_companaies_employer,
      character_category_char_international_companaies_employers_address:
      this.variants.character_category_char_international_companaies_employers_address,
      character_category_char_international_companaies_position: this.variants.character_category_char_international_companaies_position,

      character_category_char_state_position:
        this.variants.character_category_char_state_position === 'Нет' ? false :
          this.variants.character_category_char_state_position === 'Да' ? true : null,
      character_category_char_state_position_employer: this.variants.character_category_char_state_position_employer,
      character_category_char_state_position_employers_address: this.variants.character_category_char_state_position_employers_address,
      character_category_char_state_position_position: this.variants.character_category_char_state_position_position,

      character_category_relative_char: this.variants.character_category_relative_char === 'Нет' ? false :
        this.variants.character_category_relative_char === 'Да' ? true : null,
      character_category_relative_char_degree_of_relationship: this.variants.character_category_relative_char_degree_of_relationship,
      character_category_relative_char_employer: this.variants.character_category_relative_char_employer,
      character_category_relative_char_employers_address: this.variants.character_category_relative_char_employers_address,
      character_category_relative_char_position: this.variants.character_category_relative_char_position,

      money_origin_text: this.variants.money_origin_text,

      is_foreign_resident: this.variants.is_foreign_resident === 'Нет' ? false : this.variants.is_foreign_resident === 'Да' ? true : null,

      tax_resident_foreign_country_agreement_agree: this.variants.tax_resident_foreign_country_agreement_agree,
      tax_foreign_country_TIN: this.variants.individual_investment_account_is_opened === 'Нет' ? false :
        this.variants.individual_investment_account_is_opened === 'Да' ? true : null,

      usa_citizenship: this.variants.usa_citizenship,
      usa_citizenship_variant: this.variants.usa_citizenship_variant,
      usa_citizenship_residence_permit: this.variants.usa_citizenship_residence_permit === 'Нет' ? false :
        this.variants.is_foreign_resident === 'Да' ? true : null,
      usa_citizenship_green_card: this.variants.usa_citizenship_green_card === 'Нет' ? false :
        this.variants.usa_citizenship_green_card === 'Да' ? true : null,
      usa_citizenship_refused_citizenship_lost: this.variants.usa_citizenship_refused_citizenship_lost === 'Нет' ? false :
        this.variants.usa_citizenship_refused_citizenship_lost === 'Да' ? true : null,
      usa_citizenship_refused_citizenship_renounced: this.variants.usa_citizenship_refused_citizenship_renounced === 'Нет' ? false :
        this.variants.usa_citizenship_refused_citizenship_renounced === 'Да' ? true : null,
      usa_citizenship_refused_citizenship_not_receiving_after_birth:
        this.variants.usa_citizenship_refused_citizenship_not_receiving_after_birth === 'Нет' ? false :
          this.variants.usa_citizenship_refused_citizenship_not_receiving_after_birth === 'Да' ? true : null
    });

    const reputations = [this.variants.court_proceedings_player, this.variants.was_punished,
      this.variants.state_reward, this.variants.overdue_credits, this.variants.recomendations];
    // for (const reputation of reputations) {
    //   if (reputation) {
    //     this.formPersonalData.get('business_reputation').value.push(reputation);
    //   }
    // }
    for (let i = 1; i < 4; i++) {
      if (this.variants['tax_foreign_country_' + i.toString()] && this.variants['tax_foreign_country_' + i.toString() + '_TIN']) {
        this.formPersonalData.get('tax_foreign').value.push({
          tax_foreign_country: this.variants['tax_foreign_country_' + i.toString()],
          tax_foreign_country_TIN: this.variants['tax_foreign_country_' + i.toString() + '_TIN'],
        });
      }
    }
  }

  setUsaCitizenship() {
    this.formPersonalData.get('usa_citizenship_residence_permit')
      .setValue((this.formPersonalData.get('usa_citizenship_variant').value === 'usa_citizenship_residence_permit').toString());
    this.formPersonalData.get('usa_citizenship_green_card')
      .setValue((this.formPersonalData.get('usa_citizenship_variant').value === 'usa_citizenship_green_card').toString());
    this.formPersonalData.get('usa_citizenship_refused_citizenship_lost')
      .setValue((this.formPersonalData.get('usa_citizenship_variant').value === 'usa_citizenship_refused_citizenship_lost').toString());
    this.formPersonalData.get('usa_citizenship_refused_citizenship_renounced')
      .setValue((this.formPersonalData.get('usa_citizenship_variant').value ===
        'usa_citizenship_refused_citizenship_renounced').toString());
    this.formPersonalData.get('usa_citizenship_refused_citizenship_not_receiving_after_birth')
      .setValue((this.formPersonalData.get('usa_citizenship_variant').value ===
        'usa_citizenship_refused_citizenship_not_receiving_after_birth').toString());
  }

  // setSecurities() {
  //   this.formPersonalData.get('cash_only')
  //     .setValue((this.formPersonalData.get('securities_variant').value === 'cash_only').toString());
  //   this.formPersonalData.get('securities')
  //     .setValue((this.formPersonalData.get('securities_variant').value === 'securities').toString());
  // }

  setCharacterCategory() {
    this.formPersonalData.get('character_category_public_char')
      .setValue((this.formPersonalData.get('character_category_variant').value === 'character_category_public_char').toString());
    this.formPersonalData.get('character_category_char_international_companaies')
      .setValue((this.formPersonalData.get('character_category_variant').value ===
        'character_category_char_international_companaies').toString());
    this.formPersonalData.get('character_category_char_state_position')
      .setValue((this.formPersonalData.get('character_category_variant').value === 'character_category_char_state_position').toString());
    this.formPersonalData.get('character_category_relative_char')
      .setValue((this.formPersonalData.get('character_category_variant').value === 'character_category_relative_char').toString());
  }

  private _getVariants() {
    this.cabinetService.dataSubject.subscribe((data: any) => {
      if (!this.variants && data) {
        this.variants = data.client.quiz;
        this._validation();
      }
    },
    error => {
      this.errors = parseErrors(error.error.errorMsg);
    });
  }

  onDeleteResidencyCounty(index) {
    const form = this.formPersonalData.get('tax_foreign') as FormArray;
    form.removeAt(index);
  }

  onAddTaxCountry() {
    const form = this.formPersonalData.get('tax_foreign') as FormArray;
    form.push(new FormGroup({
      tax_foreign_country: new FormControl(null, [Validators.required]),
      tax_foreign_country_TIN: new FormControl(null, [Validators.required]),
    }));
  }

  onChangeCheckboxList(value: string, form: FormGroup, controlName: string) {
    form.get(controlName).setValue(value);
    form.get(controlName).markAsTouched();
  }

  isChecked(item: string, control: AbstractControl) {
    return (control.value as string[]).indexOf(item) > -1;
  }

  setTaxForeign() {
    let n = 2;
    for (let i = 1; i < n; i++) {
      if (this.formPersonalData.contains('tax_foreign_country_' + i)) {
        n++;
        this.formPersonalData.removeControl('tax_foreign_country_' + i);
        this.formPersonalData.removeControl('tax_foreign_country_' + i + '_TIN');
      }
    }
    const form = this.formPersonalData.get('tax_foreign') as FormArray;
    for (let i = 0; i < form.length; i++) {
      this.formPersonalData.addControl('tax_foreign_country_' + (i + 1),
        new FormControl((form.at(i) as FormGroup).get('tax_foreign_country').value));
      this.formPersonalData.addControl('tax_foreign_country_' + (i + 1) + '_TIN',
        new FormControl((form.at(i) as FormGroup).get('tax_foreign_country_TIN').value));
    }
  }

  changeFile(event, key: string) {
    this.formPersonalData.get(key).setValue([]);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.isImageUpload = true;
      this.imageUrls[key].push('url(' + e.target.result + ')');
    };
    reader.readAsDataURL(event.target.files[0]);

    this.uploadFile(event.target.files[0]).subscribe((data: { id: number }) => {
      this.isImageUpload = false;

      const images = this.formPersonalData.get(key).value as Array<number>;
      images.push(data.id);
      this.formPersonalData.get(key).setValue(images);
    },
    error => {
      this.errors = parseErrors(error.error.errorMsg);
    });
  }

  uploadFile(image): Observable<object> {
    const formData = new FormData();
    formData.append('file', image, image.name);
    return this.cabinetService.uploadFile(formData);
  }

  public close(i: number, key: string) {
    this.imageUrls[key].splice(i, 1);

    const images = this.formPersonalData.get(key).value as Array<number>;
    images.splice(i, 1);
    this.formPersonalData.get(key).setValue(images);
  }

  onSubmitPersonalData() {
    this.setUsaCitizenship();
    this.setTaxForeign();
    this.setCharacterCategory();
    this.formPersonalData.markAllAsTouched();

    if (this.formPersonalData.invalid) {
      this.scrollToInvalidField();
    } else {
      if (this.needSmsConfirmation && !this.smsCode) {
        this.step = 2;
        this.subscriptions$.add(this
          .profile
          .saveQuiz(this.formPersonalData.getRawValue())
          .subscribe(() => {
            this.isLoadingPersonalData = false;
            this.isLoadingPersonalDataConfirm = false;
          }, (errors) => {
            this.step = 1;
            this.smsCode = '';
            this.isLoadingPersonalData = false;
            this.errorsPersonalData = errors;
            this.scrollToFirstStep();
            this.isLoadingPersonalDataConfirm = false;
          })
        );
        this.scrollToSmsStep();
      } else {
        this.isLoadingPersonalDataConfirm = true;
        this.errorsPersonalData = [];
        this.isLoadingPersonalData = true;

        this.subscriptions$.add(this
          .profile
          .saveQuizConfirm(this.smsCode)
          .subscribe(() => {
            this.isLoadingPersonalData = false;
            this.isLoadingPersonalDataConfirm = false;
            this.scrollToFinalStep();
            this.isValid.emit(true);
            this.sendMessage.emit(true);
            this.step = 3;
          }, (errors) => {
            this.step = 1;
            this.smsCode = '';
            this.isLoadingPersonalData = false;
            this.errorsPersonalData = errors;
            this.scrollToFirstStep();
            this.isLoadingPersonalDataConfirm = false;
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
        element.item(0).parentNode.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    }, 200);
  }

  private scrollToFirstStep() {
    setTimeout(() => this.firstStep.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'}), 100);
  }

  private scrollToSmsStep() {
    setTimeout(() => this.smsConfirmation.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'}), 100);
  }

  private scrollToFinalStep() {
    setTimeout(() => this.finalStep.nativeElement.scrollIntoView({behavior: 'smooth', block: 'center'}), 100);
  }

  requestSmsCode() {
    if (this.sendSmsDisabled) {
      return false;
    }
    this.cabinetService.smsRequest().subscribe(() => {},
      error => {
        this.errors = parseErrors(error.error.errorMsg);
    });
    this.sendSmsDisabled = true;
    setTimeout(() => this.sendSmsDisabled = false, 30000);
    return false;
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  filesFields(arFieldNames: QuestionElem[]) {
    return arFieldNames.filter(_ => _.key.indexOf('_files') > -1);
  }

  chunk(ar, limit) {
    return chunkArray(ar, limit);
  }
}
