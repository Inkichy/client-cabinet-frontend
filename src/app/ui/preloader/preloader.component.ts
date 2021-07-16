import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.less']
})
export class PreloaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(window.location.href.includes('agreement-page')) {
      document.querySelector('.preloader-component--js').classList.remove('preloader-block')
    } else {
      document.querySelector('.preloader-component--js').classList.add('preloader-block')
    }
  }

}
