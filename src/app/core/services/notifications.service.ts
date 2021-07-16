import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Notification } from '../../core/models/notification.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notifications = new Subject<Notification>();
  noteAdded = this.notifications.asObservable();

  add(notification: Notification) {
    this.notifications.next(notification);
  }

  addNotification(message: string) {
    this.add(new Notification('Уважаемый клиент!', message));
  }
}
