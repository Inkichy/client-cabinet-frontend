import {Component, ContentChildren, Input, OnInit, QueryList} from '@angular/core';
import {StructureModel} from '../../../core/models/cabinet-data.model';
import {groupBy} from '../../../core/utls/group-by.utls';

@Component({
  selector: 'app-structure-of-issuers-by-currency',
  templateUrl: './structure-of-issuers-by-currency.component.html',
  styleUrls: ['./structure-of-issuers-by-currency.component.less']
})
export class StructureOfIssuersByCurrencyComponent implements OnInit {
  @ContentChildren('canvas') chartItems: QueryList<any>;

  @Input() data: StructureModel[] = [];
  @Input() date: string;
  charts = [];

  constructor() {
  }

  ngOnInit() {
    const groupByValue = groupBy(this.data, (c) => c.value);
    if (groupByValue.hasOwnProperty('undefined')) {
      delete groupByValue['undefined'];
    }

    const resultObject = {};

    for (let value in groupByValue) {
      groupByValue[value].forEach((item) => {
        if (resultObject.hasOwnProperty(value)) {
          resultObject[value].items.push(item);
          resultObject[value].sum += +item.rur_rate;
        } else {
          resultObject[value] = {
            items: [item],
            sum: +item.rur_rate,
            name: value
          };
        }
      });
    }

    for (let value in resultObject) {
      const labels = [];
      const values = [];
      const colors = [];

      resultObject[value].items.forEach((item) => {
        labels.push(item.i_name);
        values.push(+item.rur_rate);
        colors.push(item.color);
      });

      this.charts.push({
        name: value,
        date: this.date,
        sum: resultObject[value].sum,
        labels,
        values,
        colors
      });
    }
  }
}
