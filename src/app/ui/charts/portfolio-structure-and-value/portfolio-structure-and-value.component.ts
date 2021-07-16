import { Component, Input, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { RatesModel, StructureModel } from '../../../core/models/cabinet-data.model';
import { isUndefined } from 'util';
import { empty } from 'rxjs';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio-structure-and-value',
  templateUrl: './portfolio-structure-and-value.component.html',
  styleUrls: ['./portfolio-structure-and-value.component.less']
})
export class PortfolioStructureAndValueComponent implements OnInit {
  sum = 0;

  @Input() rates: RatesModel;
  @Input() date: string;
  @Input() type: string;

  needRates = false;

  @Input()
  set data(value: StructureModel[]) {
    this.initChat(value);
  }

  constructor() {
  }

  ngOnInit() {
  }

  private initChat(value: StructureModel[]) {
    const labels = [];
    const values = [];
    const colors = [];
    let rate = 0;
    this.sum = 0;

    value.forEach((item, key) => {
      rate = +item.rur_rate;

      if (!isUndefined(item.value) && item.value !== 'RUR') {
        let course = 0;
        course = this.rates[item.value];
        rate = +(rate * course).toFixed(2);
        this.needRates = true;
      }

      labels.push(item.i_name);
      values.push(rate);
      colors.push(item.color);
      this.sum += rate;
    });

    new Chart('myChartCB', {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          backgroundColor: colors,
          data: values,
          borderColor: '#fff',
          borderWidth: 5,
        }]
      },

      options: {
        legend: {
          display: false,
        },
        hover: {
          mode: null
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        cutoutPercentage: 88,
        responsive: true,
        aspectRatio: 1,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              const company = data.labels[tooltipItem.index];
              const numberVal = data.datasets[0].data[tooltipItem.index];
              const resultNumber = (numberVal + '').replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
              return company + ': ' + resultNumber;
            }
          }
        }
      }
    });
  }
}
