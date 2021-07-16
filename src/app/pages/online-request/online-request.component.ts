import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CabinetService } from '../../core/services/api/cabinet.service';
import { CabinetPortfolioModel, CabinetUserPortfolioModel, CabinetDataModel } from '../../core/models/cabinet-data.model';
import { InvestmentService } from '../../core/services/api/investment.service';
import { InvestmentRequestModel } from '../../core/models/investment-request.model';
import { GetImageService } from '../../core/services/get-image.service';
import { IpoService } from '../../core/services/api/ipo.service';
import { parseErrors } from '../../core/utls/parse-error.utls';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '../../core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';
import { TimeService } from 'src/app/core/services/api/time.service';

declare const $: any;
@Component({
  selector: 'app-online-request',
  templateUrl: './online-request.component.html',
  styleUrls: ['./online-request.component.less']
})
export class OnlineRequestComponent implements OnInit, AfterViewInit {
  user: CabinetDataModel;
  tariffs: CabinetPortfolioModel[];
  tariff: CabinetPortfolioModel;

  idToDelete: number | null = null;
  investmentRequests: InvestmentRequestModel[] = [];
  item: CabinetUserPortfolioModel;
  isAllRequest = false;
  isLoading = true;
  isCanDelete = true;
  errors = [];
  productInstalled: boolean;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cabinetService: CabinetService,
    private imageService: GetImageService,
    private ipoService: IpoService,
    private notes: NotificationsService,
    private timeService: TimeService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cabinetService.dataSubject.subscribe(response => {
      this.user = response;
    });

    this.cabinetService.getUserPortfolioById(this.id).subscribe(item => {
      this.item = item;
      this.tariff = item.product;
        this.onComponentInit();
    });
  }

  ngAfterViewInit() {
    // to disable fancybox's touch intercept
    $('#ipo-assignmetn-btn').fancybox({
      touch: false
    });
  }

  private onComponentInit() {
    this.loadRequests();
    setTimeout(() => {
      try {
        window['accordion']();
        window['offer_bo']();
      } catch (e) {

      }
    }, 200);
  }

  private loadMoreRequests() {
    if (!this.isAllRequest) {
      this.loadRequests();
      this.isAllRequest = true;
    }
  }

  private loadRequests() {
    this.isLoading = true;
    this.ipoService.getContracts(+this.item.id).subscribe(response => {
      response.forEach(item => {
        item.createDateTime = item.createDateTime.split(',')[0];
      });
      this.isLoading = false;
      if (response.length === 0) {
        this.isAllRequest = true;
      }
      this.investmentRequests = response;
    },
      error => {
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Что-то пошло не так. Попробуйте перезагрузить страницу`
          )
        );
      });
  }

  convertResponseToUrl(data: ArrayBuffer): string {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    return url;
  }

  getAssignmentDocument(document, id) {
      const assignmenDocument = {
        document: document,
        id: id,
        portfolioId: this.item.id
      }
    this.ipoService.getAssignmentDocument(assignmenDocument).subscribe(
      response => {
        $.fancybox.open({
          src: this.convertResponseToUrl(response),
          type: 'iframe',
        });
      },
      () => {
        this.notes.add(
          new Notification(
            'Уважаемый клиент!',
            `Во время отправки данных произошла ошибка. Попробуйте еще раз.`
          )
        );
      }
    );
  }

  checkAssignmentDate = (date) => {
    const actualDateSplitted = this.user.meta.dateLastUpdate.split('.');
    const assignmentDateSplitted = date.split('.');
    const actualDateFormatted = new Date(+actualDateSplitted[2], +actualDateSplitted[1], +actualDateSplitted[0]).getDate();
    const assignmentDateFormatted = new Date(+assignmentDateSplitted[2], +assignmentDateSplitted[1], +assignmentDateSplitted[0]).getDate();
    return actualDateFormatted === assignmentDateFormatted;
  }

  // sends id to child popup view
  onOpenDeleteInvestmentConfirmation(id: number): void {
    this.idToDelete = id;
  }

  deleteInvestment(id: number): void {
    if (id === null) {
      this.notes.addNotification(`Произошла ошибка при удалении заявки.`);
      return;
    }
    this.idToDelete = null;
    // 'DD.MM.YYYY, hh:mm:ss' -> 'YYYY-MM-DD'
    const createAssignmentDateTime = this.investmentRequests
      .find(request => request.id === id)
      .createDateTime
      .split(',')[0]
      .split('.')
      .reverse()
      .join('-');
    this.timeService.getCurrentTime().subscribe(
      responseTime => {
        const currentDate = responseTime.date.split('T')[0];
        if (createAssignmentDateTime !== currentDate) {
          this.notes.addNotification(`Период для удаления поручения истек.`);
        } else {
          this.ipoService.deleteAssignment(id).subscribe(
            response => {
              if (!response.success) {
                this.notes.addNotification(`Произошла ошибка при удалении заявки.`);
                return;
              }

              this.investmentRequests = this.investmentRequests
                .filter(request => request.id !== id);
              this.notes.addNotification(`Заявка успешно удалена.`);
            },
            () => {
              this.notes.addNotification(`Произошла ошибка при удалении заявки.`);
            }
          );
        }
      },
      () => this.notes.addNotification(`Произошла ошибка при удалении заявки.`)
    );
  }

  getImage(product: CabinetPortfolioModel, type) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }

  getCurrencyTail(currency) {
    const arTails = {
      RUR: 'РУБ.',
      USD: '$'
    };

    return arTails[currency];
  }

  addAssignmentToList(assignment: InvestmentRequestModel): void {
    this.investmentRequests = [assignment, ...this.investmentRequests];
  }

  trackById(index: number, item: InvestmentRequestModel): number {
    return item.id;
  }
}
