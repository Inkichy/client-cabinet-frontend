import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, Event, NavigationEnd} from '@angular/router';
import { NotificationsService } from '../../core/services/notifications.service';
import { Notification } from '../../core/models/notification.model';
import { CabinetService } from 'src/app/core/services/api/cabinet.service';
import { CabinetDataModel } from 'src/app/core/models/cabinet-data.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent implements OnInit {
  public notes: Notification[];
  data: CabinetDataModel;

  constructor(
    private notifications: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
    private cabinetService: CabinetService
  ) {
      this.notes = new Array<Notification>();

      notifications.noteAdded.subscribe(note => {
          this.notes.push(note);
      });
  }

  ngOnInit(): void {
    this.cabinetService.dataSubject.subscribe((response: any) => {
      this.data = response;
    });
    this.checkURl();
  }

  private async hide(note: Notification) {
      const index = this.notes.indexOf(note);
      if (index >= 0) {
          this.notes.splice(index, 1);
      }
      return await note.link ? note.link : false;
  }

  private update(note: Notification) {
    const index = this.notes.indexOf(note);
    if (index >= 0) {
        this.notes.splice(index, 1);
    }
    if (note.link === '/notices' && this.data.notification.new) {
      this.data.notification.new = false;
      this.cabinetService.dataSubject.next(this.data);
    }
  }
  checkURl() {
    this.router.events.subscribe((evt: Event) => {
      if (evt instanceof NavigationEnd && this.router.url.indexOf('/auth/') > -1) {
        this.notes.splice(0, this.notes.length);
      }
    });
  }
}
