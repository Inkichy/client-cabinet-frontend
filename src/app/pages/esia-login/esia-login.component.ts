import {Component, OnInit, OnDestroy} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {parseErrors} from '../../core/utls/parse-error.utls';
import {Router} from '@angular/router';

@Component({
  selector: 'app-esia-login',
  templateUrl: './esia-login.component.html',
  styleUrls: ['./esia-login.component.less']
})
export class EsiaLoginComponent implements OnInit, OnDestroy {
  isLoadPreloader = true;
  subscription: any;
  errors = [];

  constructor(private cookieService: CookieService,
              private cabinetService: CabinetService,
              private router: Router) {
  }

  ngOnInit() {
    this.cookieService.set('isAuth', 'yes');
    localStorage.setItem('isAuth', 'yes');
    this.checkPortfolioItems();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  async checkPortfolioItems() {
    if (!this.cabinetService.dataLoaded) {
      await this.cabinetService.getData().toPromise().then((resolve) => {
          this.subscription = this.cabinetService.getUserPortfolio().subscribe(data => {
              this.isLoadPreloader = false;
              if (data.length !== 0) {
                this.router.navigate(['/portfolio']);
              } else {
                this.router.navigate(['/main']);
              }
            },
            error => {
              this.isLoadPreloader = false;
              this.errors = parseErrors(error.error.errorMsg);
            }
          );
        },
        (reject) => {
          this.cookieService.delete('isAuth');
          localStorage.removeItem('isAuth');
          this.router.navigate(['/sign-in']);
        });
    }
  }
}
