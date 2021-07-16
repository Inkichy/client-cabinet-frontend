import { Component, OnInit, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router, Event } from '@angular/router';
import { CabinetService } from '../../src/app/core/services/api/cabinet.service';
import { CabinetDataModel } from '../../src/app/core/models/cabinet-data.model';
import { GuardAuthService } from '../../src/app/core/services/guard-auth.service';
import { AuthService } from '../../src/app/core/services/api/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  styles: [
    `@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";`
  ]
})

export class AppComponent implements OnInit, OnChanges {

  constructor(
    private router: Router,
    private cabinetService: CabinetService,
    private location: Location,
    private guardService: GuardAuthService,
    private authService: AuthService) {

    this.currentLocation = this.location.path();
  }


  data: CabinetDataModel;
  title = 'my-app';
  loaded = true;
  isPdfCreated = false;
  currentLocation: string;
  eventTime = 0;
  isLogout = false;
  isTimeOff = false;
  currentTime: number;
  startTime: number;
  errors = [];
  forbiddenLocations: string[];
  messenger: boolean;

  ngOnInit() {
    this.router.events.subscribe((evt: Event) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });

    if (!this.cabinetService.dataLoaded && localStorage.getItem('isAuth') === 'yes' && this.location.path().indexOf('/auth/') === -1) {
      this.cabinetService.getData().subscribe();
    }

    this.cabinetService.dataSubject.subscribe((_: any) => {
      this.data = _;
      this.isLogout = false;
    });
    this.changeUrlHandler();
    this.checkUserActivity();
  }

  ngOnChanges(): void {
    this.checkUserLocalStorage();
  }

  changeUrlHandler() {
    this.location.onUrlChange(() => {
      if (this.location.path().indexOf('/auth/') === -1 && this.guardService.isAuth) {
        this.loaded = true;
      } else {
        this.loaded = false;
      }
    });
  }

  logOutTimer() {
    const timeoutHolder: any = {};
    timeoutHolder.handler = setTimeout(() => { // разлогин пользователя по таймауту
      if (localStorage.getItem('isAuth') === 'yes') {
        this.isLogout = true;
        this.authService.signOut().subscribe();
      }
    }, 900000);
    return timeoutHolder;
  }

  checkUserActivity() {
    let timer = this.logOutTimer();
    this.router.events.subscribe((evt: Event) => {
      if (evt instanceof NavigationEnd) {
        clearTimeout(timer.handler);
        timer = this.logOutTimer();
      }
    });
  }

  checkUserLocalStorage() {
   // Clear on startup if expired
    const hours = 24;
    const saved = localStorage.getItem('saved');
    if (saved && (new Date().getTime() - (+saved) > hours * 60 * 60 * 1000)) {
      localStorage.removeItem('client');
    }

    // Increase expiration time after save
    localStorage.setItem('saved', new Date().getTime().toLocaleString());

  }

  setScrollPos(messenger) {
    return this.messenger = messenger;
  }
}
