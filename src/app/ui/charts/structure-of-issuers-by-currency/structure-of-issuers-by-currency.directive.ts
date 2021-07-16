import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import * as Chart from 'chart.js';

@Directive({
  selector: '[chart]'
})
export class StructureOfIssuersByCurrencyDirective implements OnInit {
  @Input() labels: [];
  @Input() colors: [];
  @Input() values: [];

  constructor(public el: ElementRef) {
  }

  ngOnInit() {
    new Chart(this.el.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [{
          backgroundColor: this.colors,
          data: this.values,
          borderColor: '#fff',
          borderWidth: 5,
        }]
      },
      options: {
        legend: {
          display: false
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
