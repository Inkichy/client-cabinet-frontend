import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CabinetService } from '../../core/services/api/cabinet.service';
import { CabinetPortfolioModel } from '../../core/models/cabinet-data.model';
import { CabinetDataModel } from '../../core/models/cabinet-data.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';

declare let jQuery: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit, AfterViewInit {
  newStrategy: CabinetPortfolioModel;
  NewStockAndBond: CabinetPortfolioModel;
  data: CabinetDataModel;
  productInstalled = false;
  loaded = false;
  isShown: boolean;

  constructor(private cabinetService: CabinetService, private activatedRoute: ActivatedRoute, private notes: NotificationsService) {
  }
  ngAfterViewInit() {
    this.showTestPopup();
  }

  ngOnInit() {

    this
      .cabinetService
      .getNewStrategy()
      .subscribe(_ => this.newStrategy = _);


    this
      .cabinetService
      .getNewStockAndBond()
      .subscribe(_ => this.NewStockAndBond = _);

    this
      .cabinetService
      .getUserPortfolio()
      .subscribe(items => {
        if (items.filter(item => item.product.ITEM_TYPE === 'Брокерское обслуживание').length > 0) {
          this.productInstalled = true;
        }
      });


    this
      .cabinetService
      .dataSubject
      .subscribe(_ => {
        this.loaded = true;
      });

    this.cabinetService.dataSubject.subscribe((_: any) => {
      this.data = _;
    });
  }

  showTestPopup() {
    const status = localStorage.getItem('isShown');
    if (status === null) {
      this.notes.add(new Notification('Уважаемый клиент!', `Личный кабинет работает в тестовом режиме. Обратную связь
       Вы можете отправить по адресу feedback-lk@qbfin.ru`));
      localStorage.setItem('isShown', 'true');
    } else {
      return false;
    }
  }

}
