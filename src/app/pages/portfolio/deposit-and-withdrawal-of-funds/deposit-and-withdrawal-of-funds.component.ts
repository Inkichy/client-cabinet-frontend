import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { TMService } from 'src/app/core/services/api/tm.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { formatDate } from '@angular/common';
import { CabinetService } from 'src/app/core/services/api/cabinet.service';
import { CabinetUserPortfolioModel } from '../../../core/models/cabinet-data.model';
import { parseErrors } from '../../../core/utls/parse-error.utls';

@Component({
  selector: 'app-deposit-and-withdrawal-of-funds',
  templateUrl: 'deposit-and-withdrawal-of-funds.component.html',
  styleUrls: ['deposit-and-withdrawal-of-funds.component.less']
})
export class DepositAndWithdrawalOfFundsComponent implements OnInit {
  public item: CabinetUserPortfolioModel;
  public id: number;
  public fonds = [];
  public lastOperaions = [];
  public withdraw: any;
  public start: string;
  public end: string;
  public yearsArr = [];
  public defaultStart: string;
  public defaultEnd: string;
  public startInvestDate: string;
  public errorMessages = [];
  errors = [];
  method: any;

  constructor(
    private route: ActivatedRoute,
    private cabinetService: CabinetService,
    private tmService: TMService) {

    this.id = +this.route.snapshot.paramMap.get('id');
    const dateEnd = new Date();
    this.defaultEnd = formatDate(new Date(), 'dd.MM.yyyy', 'ru-RU');
    dateEnd.setMonth(dateEnd.getMonth() - 1);
    this.defaultStart = formatDate(dateEnd, 'dd.MM.yyyy', 'ru-RU');
  }

  ngOnInit() {
    this.cabinetService.getUserPortfolioById(this.id).subscribe(
      item => {
      this.item = item;
      this.start = this.item.date;
      this.lastOperaions = this.item.lastOperations;
      this.withdraw = this.item.withdraw;
      this.startInvestDate = this.item.date;
      this.setExtraFieldsToUserPortfolio();
      }
    );
  }

  public getFonds() {
    this.tmService.depositWithdrawalFunds({
      start_date: this.start || this.defaultStart,
      end_date: this.end,
      id: this.id
    }).subscribe((data: any) => {
      this.lastOperaions = data;
      this.setExtraFieldsToUserPortfolio();
    },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      });
  }

  setExtraFieldsToUserPortfolio() {
    this.lastOperaions.forEach((item) => {
      if (item.to) {
        this.cabinetService.getPortfolioByFancyId(item.to).subscribe(portfolio => {
          item.agreementNumber = portfolio.agreementNumber;
          item.id = portfolio.id;
          item.d_date = portfolio.d_date;
        },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          });
      } else {
        return false;
      }
    });
  }

  onChangeDateStart(date) {
    this.start = date;
    this.checkDate();

  }

  onChangeDateEnd(date) {
    this.end = date;
    this.checkDate();
  }

  checkDate() {
    let dateArrayStart;
    let dateArrayEnd;
    let dateArrayDefaultEnd;
    let dateArrayStartInvest;
    let startDate;
    let endDate;
    let defaultEndDate;
    let StartInvestDate;

    dateArrayStart = this.start ? this.start.split('.') : this.defaultStart.split('.');
    dateArrayEnd = this.end ? this.end.split('.') : this.defaultEnd.split('.');
    dateArrayDefaultEnd = this.defaultEnd.split('.');
    dateArrayStartInvest = this.startInvestDate.split('.');
    startDate = new Date(+dateArrayStart[2], dateArrayStart[1] - 1, +dateArrayStart[0]);
    endDate = new Date(+dateArrayEnd[2], dateArrayEnd[1] - 1, +dateArrayEnd[0]);
    defaultEndDate = new Date(+dateArrayDefaultEnd[2], dateArrayDefaultEnd[1] - 1, +dateArrayDefaultEnd[0]);
    StartInvestDate = new Date(+dateArrayStartInvest[2], dateArrayStartInvest[1] - 1, +dateArrayStartInvest[0]);


    if (startDate <= endDate) {
      if (startDate >= StartInvestDate) {
        if (endDate <= defaultEndDate) {
          this.errorMessages.splice(0, this.errorMessages.length);
          this.getFonds();
        } else {
          this.errorMessages = parseErrors('Дата конца периода позже текущей даты');
        }
      } else {
        this.errorMessages = parseErrors('Дата начала периода раньше даты начала инвестирования');
      }
    } else {
      this.errorMessages = parseErrors('Дата начала периода позднее даты конца периода');
    }
  }

  private formatDate(date) {
    return date.getDate() + '.' + date.getMonth() + 1 + '.' + date.getFullYear();
  }
}
