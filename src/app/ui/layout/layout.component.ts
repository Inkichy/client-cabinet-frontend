import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  @Input() isSiteGray = false;

  constructor(private _router: Router) {
  }

  ngOnInit() {

  }
  setWrapperStyle() {
    const style = {};
    if (this._router.url === '/what-is-iis') {
      style['max-width'] = '100%';
      style['width'] = '100%';
      style['margin-left'] = '0';
      style['margin-right'] = '0';
    }
    return style;
  }
  setHeaderStyle() {


    const style = {};
    if (this._router.url === '/what-is-iis') {
      style['max-width'] = '1600px';
      style['width'] = '90%';
      style['margin'] = '0 auto';
    }
    return style;
  }
}
