import {Component, OnInit} from '@angular/core';
import {CabinetUserPortfolioModel} from '../../../core/models/cabinet-data.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TMService} from '../../../core/services/api/tm.service';
import {CabinetService} from '../../../core/services/api/cabinet.service';
import { parseErrors } from '../../../core/utls/parse-error.utls';

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html',
    styleUrls: ['./analytics.component.less']
})
export class AnalyticsComponent implements OnInit {

    public id: number;
    public bxId: number[];
    public reports = [];
    public yearsArr = [];
    public item: CabinetUserPortfolioModel;
    public isLoadedYear = false;
    errors = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private tmService: TMService,
                private cabinetService: CabinetService) {

        this.id = +this.route.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.getProducts();
    }

    getAnalytics(yearElem, bxId) {
        this.isLoadedYear = false;
        for (const year of this.yearsArr) {
            if (year !== yearElem) {
                year.isActive = false;
            } else {
                year.isActive = true;
            }
        }

        this.tmService.analytics({ year: yearElem.year, product: bxId }).subscribe((data: any) => {
            this.reports = data;
            this.isLoadedYear = true;
        },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        });
    }

    getProducts() {
        this.cabinetService.getUserPortfolioById(this.id).subscribe(
            (item: any) => {
                this.item = item;
                this.cabinetService.getBxIdProductByPortfolioId(item.portfolioId).subscribe(_ => {
                  this.bxId = _;
                },
                  error => {
                    this.errors = parseErrors(error.error.errorMsg);
                  });
                if (item.years.length === 0){
                    this.yearsArr = [];
                    this.isLoadedYear = true;
                } else {
                  this.yearsArr = this.item.years.slice();
                  this.yearsArr = this.yearsArr.map((year) => {
                    return {
                      year: year,
                      isActive: false
                    };
                  });
                  this.getAnalytics(this.yearsArr[0], this.bxId[0]);
                }
            }
        );
    }

    Download(fileName: any, fileUrl: any) {
        const params2 = [
            `download=true`,
            `api_url=${fileUrl}`,
            `filename=${fileName}`,
            `type=application/pdf`,
            `extension=.pdf`
        ].join('&');

        window.open(`/documents_page?${params2}`);
    }

    ShowFile(fileUrl: any) {
        const params2: string = [
            `download=false`,
            `api_url=${fileUrl}`,
            `type=application/pdf`,
        ].join('&');

        window.open(`/documents_page?${params2}`);
    }
}
