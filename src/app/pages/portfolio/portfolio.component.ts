import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';
import { CabinetPortfolioModel, CabinetUserPortfolioModel, RatesModel, CabinetDataModel} from '../../core/models/cabinet-data.model';
import * as Chart from 'chart.js';
import {GetImageService} from '../../core/services/get-image.service';
import {getMatIconFailedToSanitizeLiteralError} from '@angular/material';
import {Router} from '@angular/router';
import { parseErrors } from '../../core/utls/parse-error.utls';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.less']
})
export class PortfolioComponent implements OnInit {
    balance: number;
    dateLastUpdate: string;
    items: CabinetUserPortfolioModel[];
    colors = [
        '#172e44',
        '#919090',
        '#63a945',
        '#295784',
        '#b56718',
        '#5779ba',
    ];

    defautlColor = 'orange';
    pieChart: any;
    // rates: RatesModel;
    emptyPortfolio = true;
    errors = [];


    constructor(private cabinetService: CabinetService, private imageService: GetImageService,
                private router: Router) {

    }

    ngOnInit() {
        // this.subscribeRates();

        this.cabinetService.getUserPortfolio().subscribe(items => {
            this.balance = this.getBalance(items);

            if (items.length !== 0) {
                this.emptyPortfolio = false;
                const sum = this.balance;
                let colorIndex = this.colors.length - 1;

                items.forEach(item => {
                    const sumItem = this.currencySetup(item);

                    if (sumItem) {
                        item.share = sumItem / sum * 100;
                    } else {
                        item.share = 0;
                    }
                    if (colorIndex >= 0) {
                        item.color = this.colors[colorIndex];
                        colorIndex--;
                    } else {
                        item.color = this.defautlColor;
                    }
                });

                this.items = items;

                setTimeout(() => {
                    this.initChart();
                }, 100);
            }
        },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          });

        this.cabinetService.getMeta().subscribe(meta => {
            this.dateLastUpdate = meta.dateLastUpdate;
        },
          error => {
            this.errors = parseErrors(error.error.errorMsg);
          });
    }

    initChart() {
        this.pieChart = new Chart('pieChart', {
            type: 'doughnut',
            data: {
                labels: this.items.map((_) => _.product.name),
                datasets: [{
                    backgroundColor: this.items.map((_) => _.color),
                    data: this.items.map((_) => Math.round(_.share * 100) / 100),
                    ids: this.items.map((_) => _.id),
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
                cutoutPercentage: 85,
                responsive: true,
                aspectRatio: 1,
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            const portfolio = data.labels[tooltipItem.index];
                            const percentage = data.datasets[0].data[tooltipItem.index];
                            return portfolio + ': ' + percentage + '%';
                        }
                    }
                },
                onClick: this.redirect.bind(this)
            }
        });
    }

    redirect(e) {
        const segment = this.pieChart.getElementAtEvent(e);
        const index = segment[0]._index;
        const id = this.pieChart.data.datasets[0].ids[index];
        this.router.navigate(['/portfolio', id]);
    }

    getIcon(item: CabinetPortfolioModel) {
        if (item && item.IBLOCK_ID && item.DETAIL_PICTURE) {
            return this.imageService.getImageUrl(item.IBLOCK_ID, item.DETAIL_PICTURE, 'DETAIL_PICTURE');
        }
    }

    // private subscribeRates() {
    //     this.cabinetService
    //         .getRates()
    //         .subscribe((model) => {
    //             this.rates = model;
    //         },
    //           error => {
    //             this.errors = parseErrors(error.error.errorMsg);
    //           });
    // }

    getBalance(items: CabinetUserPortfolioModel[]) {
        let sum = 0;
        items.forEach(item => {
            if (item.amount) {
                sum += this.currencySetup(item);
            }
        });
        return sum;
    }

    currencySetup(item) {
        let sum = 0;
        for (const k in item.amount) {
            if (k === 'RUR') {
                sum += +item.amount[k];
            } else {
                sum += +item.amount[k] * item.rates[k];
            }
        }
        return sum;
    }
}
