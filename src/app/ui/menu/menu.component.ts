import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {CabinetService} from '../../core/services/api/cabinet.service';
import { parseErrors } from '../../core/utls/parse-error.utls';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  @Input() recursive = true;
  newUser = true;
  errors = [];

  constructor(
    private _router: Router,
    private cabinetService: CabinetService
  ) { }

  ngOnInit() {
    this.cabinetService.getUserPortfolio().subscribe(
      items => this.newUser = items.length === 0,
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      }
    );
  }
  public getActiveUrl() {
    return this._router.url;
  }
  public setActiveUrl(path: string) {
    return this._router.url.startsWith(path);
  }
}
