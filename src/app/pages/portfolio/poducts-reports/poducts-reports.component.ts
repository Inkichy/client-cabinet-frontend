import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { formatDate } from '@angular/common';
import { TMService } from 'src/app/core/services/api/tm.service';
import { CabinetService } from '../../../core/services/api/cabinet.service';
import { CabinetUserPortfolioModel } from '../../../core/models/cabinet-data.model';
import { CabinetReportModel } from '../../../core/models/cabinet-data.model';
import { parseErrors } from '../../../core/utls/parse-error.utls';
import { isEmpty } from 'rxjs/internal/operators';
import { NotificationsService } from '../../../core/services/notifications.service';
import { Notification } from '../../../core/models/notification.model';
import { sha256 } from 'js-sha256';
declare let jQuery: any;

@Component({
  selector: 'app-poducts-reports',
  templateUrl: 'poducts-reports.component.html',
  styleUrls: ['poducts-reports.component.less'],
})
export class ProductReportsComponent implements OnInit {
  public id: string;
  public reports = [];
  public yearsArr = [];
  public errors = [];
  public reportPeriods = [];
  public currentReports = [];
  public reportsObj: CabinetReportModel;
  public item: CabinetUserPortfolioModel;
  public defaultStart: string;
  public defaultEnd: string;
  public start: string;
  public end: string;
  public startInvestDate: string;
  public errorMessages = [];
  public productTypePeriod: number;

  isLoadedYear = false;
  isReportLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tmService: TMService,
    private cabinetService: CabinetService,
    private http: HttpClient,
    private apiService: ApiService,
    private notes: NotificationsService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    const dateEnd = new Date();
    this.defaultEnd = formatDate(new Date(), 'dd.MM.yyyy', 'ru-RU');
    dateEnd.setMonth(dateEnd.getMonth() - 1);
    this.defaultStart = formatDate(dateEnd, 'dd.MM.yyyy', 'ru-RU');
  }

  ngOnInit() {
    this.getProducts();
    this.cabinetService.getUserPortfolioType('Доверительное управление').subscribe(
      (data: any) => {
        if (data.find(item => item.id === this.id) !== undefined) {
          this.productTypePeriod = 3;
        } else {
          this.productTypePeriod = 1;
        }
      }
    );
    let b = [];
    const currentDate = new Date();
    const startReportDate = this.item.date.split('.');
    const startReportDateFormatted = new Date(
      +startReportDate[2],
      +startReportDate[1] - 1,
      1
    );
    startReportDateFormatted.setMonth(startReportDateFormatted.getMonth() + 1);
    b.push(formatDate(startReportDateFormatted, 'dd.MM.yyyy', 'ru-RU'));
    do {
      startReportDateFormatted.setMonth(
        startReportDateFormatted.getMonth() + this.productTypePeriod
      );
      const a = formatDate(startReportDateFormatted, 'dd.MM.yyyy', 'ru-RU');
      if (currentDate >= startReportDateFormatted) {
        b.push(a);
      }
    } while (currentDate >= startReportDateFormatted);

    for (let i = 1; b.length > i; i++) {
      this.reportPeriods.push(b[i - 1] + '-' + b[i]);
    }
    if (this.currentReports.length === 0) {
      this.getPeriodReports(this.yearsArr[0]);
    }
  }

  getPeriodReports(yearElem) {
      this.isLoadedYear = false;
      this.currentReports.splice(0, this.currentReports.length);
      const currentReportPeriods = this.reportPeriods.filter(
        (period) => +period.match(/\d{4}$/) === yearElem.year
      );

      for (const year of this.yearsArr) {
      if (year !== yearElem) {
        year.isActive = false;
      } else {
        year.isActive = true;
      }
    }

      for (let i = 0; currentReportPeriods.length > i; i++) {
      this.currentReports.push({
        date: currentReportPeriods[i],
        description: `Отчет по продукту ` + this.item.product.name,
        file_url: `/api/cabinet/sendEmailWithReport/` + currentReportPeriods[i] + `-` + this.id
      });
    }
      this.isLoadedYear = true;
      return this.currentReports;
  }

  getProducts() {
    this.cabinetService.getUserPortfolioById(this.id).subscribe((item: any) => {
      this.item = item;
      this.startInvestDate = this.item.date;

      if (this.item.years.length === 0) {
        this.yearsArr = [];
        this.isLoadedYear = true;
      } else {
        this.yearsArr = this.item.years.slice();
        this.yearsArr = this.yearsArr.map((year) => {
          return {
            year: year,
            isActive: false,
          };
        });
        this.getPeriodReports(this.yearsArr[0]);
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

    dateArrayStart = this.start
      ? this.start.split('.')
      : this.defaultStart.split('.');
    dateArrayEnd = this.end ? this.end.split('.') : this.defaultEnd.split('.');
    dateArrayDefaultEnd = this.defaultEnd.split('.');
    dateArrayStartInvest = this.startInvestDate.split('.');
    startDate = new Date(
      +dateArrayStart[2],
      dateArrayStart[1] - 1,
      +dateArrayStart[0]
    );
    endDate = new Date(+dateArrayEnd[2], dateArrayEnd[1] - 1, +dateArrayEnd[0]);
    defaultEndDate = new Date(
      +dateArrayDefaultEnd[2],
      dateArrayDefaultEnd[1] - 1,
      +dateArrayDefaultEnd[0]
    );
    StartInvestDate = new Date(
      +dateArrayStartInvest[2],
      dateArrayStartInvest[1] - 1,
      +dateArrayStartInvest[0]
    );

    if (startDate <= endDate) {
      if (startDate >= StartInvestDate) {
        if (endDate <= defaultEndDate) {
          this.errorMessages.splice(0, this.errorMessages.length);
        } else {
          this.errorMessages = parseErrors(
            'Дата конца периода позже текущей даты'
          );
        }
      } else {
        this.errorMessages = parseErrors(
          'Дата начала периода раньше даты начала инвестирования'
        );
      }
    } else {
      this.errorMessages = parseErrors(
        'Дата начала периода позднее даты конца периода'
      );
    }
  }

  sendReport(url) {
    this.isReportLoading = true;
    return this.http.get(url).subscribe((data: any) => {
      this.isReportLoading = false;
      if (data.success) {
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Отчёт по продукту будет отправлен на Вашу почту в
                     течение минуты.`
          )
        );
      } else {
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Что-то пошло не так, попробуйте отправить отчёт еще раз.`
          )
        );
      }
    }, error => {
        this.isReportLoading = false;
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Что-то пошло не так, попробуйте отправить отчёт еще раз.`
          )
        );
    });
  }

  ShowInfo() {
    let startDate;
    let endDate;
    this.isReportLoading = true;
    this.start ? (startDate = this.start) : (startDate = this.defaultStart);
    this.end ? (endDate = this.end) : (endDate = this.defaultEnd);
    return this.http
      .get(
        this.apiService.getApiUrl(
          'cabinet/sendEmailWithReport/' +
            startDate +
            '-' +
            endDate +
            '-' +
            this.id
        )
      )
      .subscribe((data: any) => {
        this.isReportLoading = false;
        if (data.success) {
          this.notes.add(
            new Notification(
              'Уважаемый клиент!',
              `Отчёт по продукту будет отправлен на Вашу почту в
                     течение минуты.`
            )
          );
        } else {
          this.errors = parseErrors(data.errorMsg);
          setTimeout(() => {
            this.errors.splice(0, this.errors.length);
          }, 5000);
          this.notes.add(
            new Notification(
              'Уважаемый клиент!',
              `Что-то пошло не так, попробуйте отправить отчёт еще раз.`
            )
          );
        }
      }, error => {
          this.isReportLoading = false;
          this.notes.add(
            new Notification(
              'Уважаемый клиент!',
              `Что-то пошло не так, попробуйте отправить отчёт еще раз.`
            )
          );
      });
  }

  Download(fileName, dateStart?, dateFinish?) {
    let startDate: any;
    let endDate: any;

    if (dateStart) {
      startDate = dateStart;
    } else {
      startDate = this.start ? this.start : this.defaultStart;
    }

    if (dateFinish) {
      endDate = dateFinish;
    } else {
      endDate = this.end ? this.end : this.defaultEnd;
    }

    const url = 'api/cabinet/getReport/' + startDate + '-' + endDate + '-' + this.id;

    const params = [
      `download=true`,
      `api_url=${url}`,
      `filename=Отчет по продукту «${fileName}» за ${startDate}-${endDate}`,
      `type=application/pdf`,
      `extension=.pdf`,
    ].join('&');

    window.open(`/documents_page?${params}`);
  }

  Reports() {
    let date = `${this.item.d_date}`.split(".");
    let hashstring = this.item.CONTR + '_' + date[2] + '-' + date[1] + '-' + date[0];
    let hash = '0x' + sha256(hashstring).toUpperCase();
    window.open("https://reports.oqbfin.ru/" + hash, '_blank');
  }
}
