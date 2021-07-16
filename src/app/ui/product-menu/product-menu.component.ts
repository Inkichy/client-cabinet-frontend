import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.less']
})
export class ProductMenuComponent implements OnInit {
  @Input() id: number;
  @Input() type: string;

  constructor(private _router: Router) { }

  ngOnInit() {

  }

  getPath(path) {
    const index = this._router.url.indexOf(path);

    if (index > -1) {
      return true;
    } else {
      return false;
    }
  }
}
