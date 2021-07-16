import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {CabinetService} from 'src/app/core/services/api/cabinet.service';
import {Subscription} from 'rxjs';
import { parseErrors } from '../../core/utls/parse-error.utls';

@Component({
  selector: 'select-product',
  templateUrl: 'select-product.component.html',
  styleUrls: ['select-product.component.less']
})
export class SelectProductComponent implements OnInit, OnDestroy {
  public isGet = false;
  public isLoading = false;
  public questionStepNumber = 1;
  public question;
  public newFormatQuestion = [];
  public questionForm: FormGroup;
  public products = [];
  public productCodes = [];
  public convenientProduct = [];
  public previousQuestionArray = [];
  private $subsctiption: Subscription;
  errors = [];

  @ViewChild('productResults') productResults: ElementRef;

  constructor(private _fb: FormBuilder,
              private _cabinetService: CabinetService) {
    this.questionForm = this._fb.group({});
  }

  ngOnInit() {
    this._getPortfolio();
    this._getQuestion();
  }

  private _getPortfolio(): void {

  }

  private _changeDataFormat(): void {
    this.newFormatQuestion = [];
    if (this.question && this.question.questions) {
      for (let question of this.question.questions) {
        if(!question) continue;

        let questionKey = Object.keys(question)[0];
        let formatObject = {key: questionKey, title: question[questionKey].title, answers: []};
        let answers = question[questionKey]["answers"];
        for (let answer of Object.keys(question[questionKey]["answers"])) {
          formatObject["answers"].push({key: answer, title: question[questionKey]["answers"][answer]});
        }
        this.newFormatQuestion.push(formatObject);
      }
    }
  }

  private _getQuestion(): void {
    this._cabinetService.getFistQuestion().subscribe((data) => {
      this.question = data;
      this._changeDataFormat();
      this._setFormControl();
    },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });
  }

  private _setFormControl(): void {
    for (const question of this.newFormatQuestion) {
      this.questionForm.addControl(question.key, new FormControl(null, Validators.required));
    }
    this.isGet = true;
  }

  public nextQuestion(): void {
    if (this.questionForm.valid) {
      this.isLoading = true;
      this.previousQuestionArray[this.questionStepNumber - 1] = {
        questionArray: this.newFormatQuestion,
        productCodes: this.productCodes
      };

      this._cabinetService.sendAnswer(this.questionForm.value).subscribe((data: any) => {
        this.isLoading = false;
        if (data && data.products) {
          this.productCodes = data.products;
          this._filterProducts();
        }

        if (data && data.questions) {
          this.questionStepNumber++;
          this._removeControl();
          this.question = data;
          this._changeDataFormat();
          this._setFormControl();
        } else {
          this.productResults.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center'});
        }
      },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        });
    }
  }

  private _filterProducts(): void {
    if (this.$subsctiption) {
      this.$subsctiption.unsubscribe();
    }
    this.$subsctiption = this._cabinetService
      .getPortfolioWithFilter().subscribe((items) => {
        items = items.filter(_ => this.productCodes.indexOf(_.CODE) > -1 ||
          _.child && _.child[0] && this.productCodes.indexOf(_.child[0].CODE) > -1);
        this.convenientProduct = items;
      },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        });
  }

  public previousQuestion(): void {
    this.questionStepNumber--;
    this._removeControl();
    if (this.questionStepNumber === 1) {
      this.convenientProduct = [];
      this.productCodes = [];
    }
    this.newFormatQuestion = this.previousQuestionArray[this.questionStepNumber - 1].questionArray;
    this._setFormControl();

    this.productCodes = this.previousQuestionArray['productCodes'];
  }

  private _removeControl(): void {
    for (const question of this.newFormatQuestion) {
      this.questionForm.removeControl(question.key);
    }
  }

  ngOnDestroy() {
    if (this.$subsctiption) {
      this.$subsctiption.unsubscribe();
    }
  }
}
