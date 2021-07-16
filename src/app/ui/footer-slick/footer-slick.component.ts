import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {CabinetService} from '../../core/services/api/cabinet.service';
import {CabinetPortfolioModel} from '../../core/models/cabinet-data.model';
import {GetImageService} from '../../core/services/get-image.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-footer-slick',
    templateUrl: './footer-slick.component.html',
    styleUrls: ['./footer-slick.component.less']
})
export class FooterSlickComponent implements OnInit, OnDestroy {

    products: CabinetPortfolioModel[];
    subscribe: Subscription;

    constructor(private cabinetService: CabinetService,
                private imageService: GetImageService) {
    }

    ngOnInit() {
        this.subscribe = this.cabinetService.getPortfolioWithFilter(false).subscribe(
            products => {
                if (!this.products) {
                    this.products = products.filter(_ => _.new && _.ACTIVE && ['Доверительное управление']
                        .indexOf(_.ITEM_TYPE) > -1);
                }
            }
        );
    }

    getDetailLink(product: CabinetPortfolioModel) {
        switch (product.ITEM_TYPE) {
            case 'Брокерское обслуживание':
                return '/broker-service/' + product.ID;
            case 'Акции':
            case 'Облигации':
                return '/broker-service/';
            case 'Доверительное управление':
                return '/trust-management/' + product.ID;
        }
        return '';
    }

    getImage(product: CabinetPortfolioModel) {
        if (product && product.IBLOCK_ID && product.PREVIEW_PICTURE) {
            return this.imageService.getImageUrl(product.IBLOCK_ID, product.PREVIEW_PICTURE);
        }

        return '';
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
}
