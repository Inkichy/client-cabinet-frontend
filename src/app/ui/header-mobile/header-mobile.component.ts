import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { parseErrors } from '../../core/utls/parse-error.utls';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.less']
})
export class HeaderMobileComponent implements OnInit {
  errors = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
        document.body.style.background = '#fff';
      }
    },
    error => {
      this.errors = parseErrors(error.error.errorMsg);
    });
  }

}
