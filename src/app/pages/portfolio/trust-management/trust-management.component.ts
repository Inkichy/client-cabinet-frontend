import {Component, Output, OnDestroy, OnInit} from '@angular/core';
import {CabinetService} from '../../../core/services/api/cabinet.service';
import {ActivatedRoute} from '@angular/router';
import {CabinetDataModel, CabinetPortfolioModel, CabinetUserPortfolioModel, RatesModel, StructureModel, TariffModel} from '../../../core/models/cabinet-data.model';
import {ChartsService} from '../../../core/services/api/charts.service';
import * as moment from 'moment';
import {isUndefined} from 'util';
import {GetImageService} from '../../../core/services/get-image.service';
import {Subscription, empty} from 'rxjs';
import { parseErrors } from '../../../core/utls/parse-error.utls';

@Component({
    selector: 'app-trust-management',
    templateUrl: './trust-management.component.html',
    styleUrls: ['./trust-management.component.less']
})
export class TrustManagementComponent implements OnInit, OnDestroy {
    private readonly subscriptions$: Subscription = new Subscription();
    user: CabinetDataModel;
    productId: number;
    tariffs: TariffModel;
    item: CabinetUserPortfolioModel;
    graphData = [];
    yieldData = [];
    startGraph: string;
    endGraph = moment().format('DD.MM.YYYY');
    startYield: string;
    endYield = moment().format('DD.MM.YYYY');
    structureGraph: StructureModel[] = [];
    structureTable = [];
    portfolio: CabinetPortfolioModel;
    isOpen1 = false;
    isOpen2 = false;
    isOpen3 = false;
    isGraphDataSuccess: boolean;
    isYieldDataSuccess: boolean;
    errors = [];

    structureOpen = false;
    emitentsOpen = false;
    currencies = [];
    strategyCurrency = [];
    productCurrency = 'summ';
    type = null;
    dateLastUpdate: string;
    colors = [
        '#00a1a7',
        '#00b453',
        '#9b6d8c',
        '#e5dc3b',
        '#28a8c6',
        '#347272',
        '#dbadc7',
        '#7e86ad',
        '#7fad15',
        '#a9ad16',
        '#685ead',
        '#0a96ad',
        '#38ad16',
        '#ad099a',
        '#ad95ac',
        '#5f41ad',
        '#8dad0b',
        '#70ada3',
        '#D9D941',
        '#A10A38',
        '#9DD6CD',
        '#FFC9A5',
        '#9B60BC',
        '#F9DD76',
        '#5BEC81',
        '#10b0a0',
        '#61b3c9',
        '#a1bfd4',
        '#5a52a1',
        '#706c94',
        '#9f6cb8',
        '#dbbceb',
        '#eb8dba',
    ];

    graphLoading = true;
    graphYieldLoading = true;

    constructor(private cabinetService: CabinetService,
                private chartService: ChartsService,
                private imageService: GetImageService,
                private route: ActivatedRoute) {
        this.productId = +this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {

      this.cabinetService.dataSubject.subscribe(response => {
        this.user = response;
      });

      if (this.structureTable.length === 0) {
            this.subscribeUserPortfolio();
            this.setEndTime();
            this.cabinetService.getMeta().subscribe(meta => {
                this.dateLastUpdate = meta.dateLastUpdate;
            },
            error => {
                this.errors = parseErrors(error.error.errorMsg);
            });
        }
        // console.log(moment().subtract(, 'days').calendar());
    }

    onLoadGraph(graphStart, graphEnd) {
        this.strategyCurrency.forEach((item) => {
            if (this.item.product.ITEM_TYPE === 'Доверительное управление' && item.name === 'USD') {
                this.productCurrency = 'summ_USD';
            }
        });
        this.graphLoading = true;
        this.subscriptions$.add(this.chartService
            .getGraph(this.productId, graphStart, graphEnd, this.productCurrency)
            .subscribe((response: any) => {
                this.graphData = response.result;
                if (this.graphData != null) {
                    this.isGraphDataSuccess = true;
                    this.graphLoading = false;
                } else {
                    this.isGraphDataSuccess = false;
                }
            }));
    }

    onLoadYield(graphStart, graphEnd) {
        this.graphYieldLoading = true;
        this.isYieldDataSuccess = false;
        this.subscriptions$.add(this.chartService
            .getYield(this.productId, graphStart, graphEnd)
            .subscribe((response: any) => {
                this.yieldData = response.result;
                if (this.yieldData != null) {
                    this.isYieldDataSuccess = true;
                    this.graphYieldLoading = false;
                } else {
                    this.isYieldDataSuccess = false;
                    this.graphYieldLoading = false;
                }
            }, error => {
              this.errors = parseErrors(error.error.errorMsg);
            }));
    }


    getImage(item: CabinetPortfolioModel) {
        return this.imageService.getImageUrl(item.IBLOCK_ID, item.PREVIEW_PICTURE);
    }

    private subscribeUserPortfolio() {
        this.subscriptions$.add(this.cabinetService
            .getUserPortfolioById(this.productId)
            .subscribe((item) => {
                this.item = item;
                this.startGraph = item.date;
                this.startYield = item.date;
                this.currencies = [];
                this.structureGraph = item.structure;

                this.prepareStructureTable();
                // tslint:disable-next-line: forin
                for (const elem in item.amount) {
                    this.currencies.push({
                        name: elem,
                        value: +item.amount[elem]
                    });
                }
                this.subscribePortfolio(item.portfolioId);
                this.onLoadGraph(this.startGraph, this.endGraph);
                this.onLoadYield(this.startYield, this.endYield);
            },
              error => {
                this.errors = parseErrors(error.error.errorMsg);
              }));

    }

    private prepareStructureTable() {
        this.structureTable = [];

        const groups = {};
        const currencies = [];
        this.structureGraph.forEach((item) => {
            if (!isUndefined(item.value)) {
                if (groups.hasOwnProperty(item.value)) {
                    groups[item.value].items.push(item);
                } else {
                    currencies.push(item.value);
                    groups[item.value] = {
                        items: [item],
                        sum: 0,
                    };
                }
            }
        });

        let colorCounter = 0;
        currencies.forEach((currency) => {
            const group: any = groups[currency];
            group.items.forEach((item, key) => {
                // @todo rur_rate нужен общий ключ не привязанный к валютам.
                group.sum += +item.rur_rate;
                item.color = (this.colors[colorCounter] || '#72dd4b');
                colorCounter += 1;
            });
        });

        currencies.forEach((currency, key) => {
            const group: any = groups[currency];
            this.structureTable.push({
                groupName: currency,
                items: group.items,
                sum: group.sum,
            });
        });

        this.structureTable.forEach(item => {
            item.items.sort((a, b) => {
                if (+this.getPercent(item.sum, a.rur_rate) > +this.getPercent(item.sum, b.rur_rate)) return 1;
                if (+this.getPercent(item.sum, a.rur_rate) === +this.getPercent(item.sum, b.rur_rate)) return 0;
                if (+this.getPercent(item.sum, a.rur_rate) < +this.getPercent(item.sum, b.rur_rate)) return -1;
            }).reverse();
        });
    }

    private subscribePortfolio(id) {
        this.cabinetService
            .getPortfolioByPortfolioId(id)
            .subscribe((model) => {
                this.portfolio = model;
                for (const elem in model.currencys) {
                    this.strategyCurrency.push({ name: model.currencys[elem] });
                }
                this.tariffs = model.TARIFS;
                this.type = model.ITEM_TYPE;
            },
              error => {
                this.errors = parseErrors(error.error.errorMsg);
              });
    }

    getPercent(a: number, b: number) {
        return (b / a * 100).toFixed(2);
    }

    getBalance(item: CabinetUserPortfolioModel) {
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

    setEndTime() {
        const id = this.route.snapshot.paramMap.get('id');
        this.cabinetService.getUserPortfolioType('Доверительное управление').subscribe(((data: any) => {
            data.forEach((item) => {
                if (item.ID === id) {
                    this.endGraph = moment().subtract(3, 'day').format('DD.MM.YYYY');
                    this.endYield = moment().subtract(3, 'day').format('DD.MM.YYYY');
                }
            });
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions$.unsubscribe();
    }
}
