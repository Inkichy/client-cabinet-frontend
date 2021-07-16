import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-burger',
  templateUrl: './header-burger.component.html',
  styleUrls: ['./header-burger.component.less']
})
export class HeaderBurgerComponent implements OnInit {

  public burgerState: boolean = false;

  constructor() { }

  ngOnInit() {
    window.addEventListener("resize", () => {
      if(document.documentElement.clientWidth >= 1100) {
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
        document.body.style.background = '#fff';
        document.querySelector('.sidebar').classList.remove('sidebar_active');
        document.querySelector('.header-mobile-burger--js').classList.remove('header-mobile-burger_active');
        if(window.location.href.includes('/auth/sign-in')) {
          document.querySelector('.header-entrance-mobile').classList.remove('header-entrance-mobile_active');
        }
      }
    });
  }

  activeBurger() {
    this.burgerState = !this.burgerState
    if(this.burgerState) {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.background = '#fff';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.body.style.background = '#333';
    }

    document.querySelector('.sidebar').classList.toggle('sidebar_active');
    document.querySelector('.header-mobile-burger--js').classList.toggle('header-mobile-burger_active');
    if(window.location.href.includes('/auth/sign-in')) {
      document.querySelector('.header-entrance-mobile').classList.toggle('header-entrance-mobile_active');
    }
  }

}