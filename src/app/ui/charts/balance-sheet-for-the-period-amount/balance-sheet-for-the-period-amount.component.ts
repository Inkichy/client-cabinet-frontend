import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as Chart from 'chart.js';
import * as moment from 'moment';
import { parseErrors } from '../../../core/utls/parse-error.utls';

@Component({
  selector: 'app-balance-sheet-for-the-period-amount',
  templateUrl: './balance-sheet-for-the-period-amount.component.html',
  styleUrls: ['./balance-sheet-for-the-period-amount.component.less']
})
export class BalanceSheetForThePeriodAmountComponent implements OnInit {
  @Output() changeDate = new EventEmitter();

  @Input() defaultStart: string;
  @Input() defaultEnd: string;
  @Input() loading: boolean;
  @Input() isGraphDataSuccess: boolean;

  @Input()
  set data(value: [number, number][]) {
    this.initChat(value);
  }

  AGGREGATION_LIMIT = 3;
  public start: string;
  public end: string;
  public errorMessages = [];

  public labels = [];
  public values = [];
  constructor() {
  }

  ngOnInit() {
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
    dateArrayStartInvest = this.defaultStart.split('.');

    startDate = new Date(+dateArrayStart[2], dateArrayStart[1] - 1, +dateArrayStart[0]);
    endDate = new Date(+dateArrayEnd[2], dateArrayEnd[1] - 1, +dateArrayEnd[0]);
    defaultEndDate = new Date(+dateArrayDefaultEnd[2], dateArrayDefaultEnd[1] - 1, +dateArrayDefaultEnd[0]);
    StartInvestDate = new Date(+dateArrayStartInvest[2], dateArrayStartInvest[1] - 1, +dateArrayStartInvest[0]);


    if (startDate <= endDate) {
      if (startDate >= StartInvestDate) {
        if (endDate <= defaultEndDate) {
          this.errorMessages.splice(0, this.errorMessages.length);
          this.changeDate.emit({ start: this.start ? this.start : this.defaultStart, end: this.end ? this.end : this.defaultEnd });
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

  private initChat(value: [number, number][]) {
    this.labels.splice(0, this.labels.length);
    this.values.splice(0, this.values.length);
    let startStr = this.start ? this.start : this.defaultStart;
    if (!startStr && value) {
      startStr = moment(+value[0][0]).format('DD.MM.YYYY');
    }

    const start = startStr.split('.');
    const end = this.end ? this.end.split('.') : this.defaultEnd.split('.');
    const diff = moment([end[2], (parseInt(end[1])-1), end[0]]).diff(
      moment([start[2], (parseInt(start[1])-1), start[0]]), 'months', true);
    let mod = 'day';

    if (+diff >= this.AGGREGATION_LIMIT) {
      mod = 'month';
    }

    if (!value && !value.length) {
      return;
    }


    if (mod === 'day') {
      value.forEach((data) => {
        const date = moment(+data[0]).format('DD.MM.YYYY');
        this.labels.push(date);
        this.values.push(+data[1]);
      });
    } else {
      value.forEach((data) => {
        const date = moment(+data[0]).format('MM.YYYY');
        const index = this.labels.indexOf(date);
        if (index > -1) {
          this.values[index] = +data[1];
        } else {
          this.labels.push(date);
          this.values.push(+data[1]);
        }
      });
    }

    Chart.Line('linearTwo', {
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Баланс',
          borderColor: '#2db2ad',
          backgroundColor: '#2db2ad',
          fill: false,
          data: this.values,
          yAxisID: 'y-axis-2',
        }]
      },
      options: {
        responsive: true,
        hoverMode: 'index',
        stacked: false,
        title: {
          display: true,
        },
        scales: {
          yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-2',
          }],
        },
        legend: {
          display: false
        },
        hover: {
          mode: null
        },
        maintainAspectRatio: false,
      }
    });
  }
}
