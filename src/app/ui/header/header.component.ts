import { Component, OnInit } from '@angular/core';
import { CabinetService } from '../../core/services/api/cabinet.service';
import { CabinetDataModel } from '../../core/models/cabinet-data.model';
import { AuthService } from '../../core/services/api/auth.service';
import { parseErrors } from '../../core/utls/parse-error.utls';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent  implements OnInit  {
  data: CabinetDataModel;
  balance = 0;
  isNewNotice = false;
  errors = [];
  isLegalEntity = false;
  firstLegalEntityNameWord = '';
  otherLegalEntityNameWords = '';
  fullName = '';



  constructor(
    private cabinetService: CabinetService,
    private authService: AuthService,
    private notes: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

   }

  ngOnInit() {
    this.cabinetService.dataSubject.subscribe((_: any) => {
        this.data = _;
        if (this.data) {
          this.isNewNotice = this.data.notification.new;
          if (this.cabinetService.dataLoaded && this.isNewNotice && !this.cabinetService.isShownAlert) {
            this.alertNewMessages();
          }
        }
      });

    this.balance = this.cabinetService.getBalance();
    if (this.data.client.isLegalEntity) {
      this.isLegalEntity = true;

      if (this.data.client.legalEntityName) {
        const allWords = this.data.client.legalEntityName.split(' ');
        this.firstLegalEntityNameWord = allWords[0];
        allWords.shift();
        this.otherLegalEntityNameWords = allWords.join(' ');
      } else {
        this.firstLegalEntityNameWord = 'Ошибка! Название юр. лица не указано';
      }
    }
  }

  onSignOut() {
    this.cabinetService.dataSubject.next(null);
    this.authService.signOut().subscribe();
  }


  activateHeader() {
    document.body.addEventListener('scroll', () => {

      if (document.body.scrollTop > 200) {

        document.querySelector('.user').classList.add('active');
      } else {
        document.querySelector('.user').classList.remove('active');
      }
    });
  }


  alertNewMessages(): boolean {
    this.cabinetService.isShownAlert = true;
    if (this.router.url !== '/notices') {
      this.notes.add(new Notification((this.data.client.name + ' ' + this.data.client?.patronymic).trim() + ',', `У вас есть непрочитанные уведомления`, '/notices'));
    } else {
      if (this.data.notification.new) {
        this.data.notification.new = false;
        this.cabinetService.dataSubject.next(this.data);
      }
      return false;
    }
  }

}
