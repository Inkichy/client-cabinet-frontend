import {Component, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TMService} from '../../core/services/api/tm.service';
import {TMDocuments} from '../../core/models/tm-documents.model';
import {CabinetPortfolioModel, CabinetUserPortfolioModel} from '../../core/models/cabinet-data.model';
import {GetImageService} from '../../core/services/get-image.service';
import {ProcessDataService} from '../../core/services/process-data.service';
import { parseErrors } from '../../core/utls/parse-error.utls';

@Component({
  selector: 'app-tm-purchase-step-two',
  templateUrl: './tm-purchase-step-two.component.html',
  styleUrls: ['./tm-purchase-step-two.component.less']
})
export class TmPurchaseStepTwoComponent implements OnInit {
  step = 1;
  id: number;
  product: CabinetPortfolioModel;
  oldUserProduct: CabinetUserPortfolioModel;
  sms: string;
  documents: TMDocuments[] = [];
  errors = [];

  mode = 1;

  constructor(
    private cabinetService: CabinetService,
    private route: ActivatedRoute,
    private router: Router,
    private tmService: TMService,
    private imageService: GetImageService,
    private processService: ProcessDataService
  ) {

  }

  ngOnInit() {
    this.id = +this.route.snapshot.queryParamMap.get('id');
    const productId = this.route.snapshot.queryParamMap.get('product');
    const oldUserProductId = this.route.snapshot.queryParamMap.get('old');

    this.cabinetService.getPortfolioById(productId).subscribe(
      product => {
        this.product = product;
      },
      error => {
        this.errors = parseErrors(error.error.errorMsg);
      }
    );

    if (oldUserProductId) {
      this.cabinetService.getUserPortfolioById(oldUserProductId).subscribe(
        oldUserProduct => {
          this.oldUserProduct = oldUserProduct;
        },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        }
      );
    }

    this.loadDocuments();
  }

  onSubmit() {
    this
      .tmService
      .confirm(this.id, this.sms)
      .subscribe((response) => {
        this.step = this.step + 1;
      },
        error => {
          this.errors = parseErrors(error.error.errorMsg);
        });
  }

  onResendSms() {
    this
      .tmService
      .resendSms(this.id)
      .subscribe();
  }

  getImage(product: CabinetPortfolioModel, type?: string) {
    if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
      return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
    }
    return '';
  }

  navigateToPayment() {
    this.router.navigate(['/tm-purchase-step-three', this.id]);
  }

  private loadDocuments() {
    this.documents = this.processService.getDocuments();
  }
}
