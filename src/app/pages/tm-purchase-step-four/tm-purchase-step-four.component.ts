import {Component, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';

@Component({
  selector: 'app-tm-purchase-step-four',
  templateUrl: './tm-purchase-step-four.component.html',
  styleUrls: ['./tm-purchase-step-four.component.less']
})
export class TmPurchaseStepFourComponent implements OnInit {

  constructor(
    private cabinetService: CabinetService
  ) {
  }

  ngOnInit() {
  }
}
