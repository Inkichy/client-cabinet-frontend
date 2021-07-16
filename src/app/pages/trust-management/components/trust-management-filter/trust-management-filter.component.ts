import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CabinetStrategyModel} from '../../../../core/models/cabinet-data.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-trust-management-filter',
  templateUrl: './trust-management-filter.component.html',
  styleUrls: ['./trust-management-filter.component.less']
})
export class TrustManagementFilterComponent implements OnInit {
  @Input() items: CabinetStrategyModel[] = [];
  @ViewChild('results') results: ElementRef;
  selectedId = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.selectedId = activatedRoute.snapshot.queryParamMap.get('filter');
  }

  ngOnInit() {
    this.selectedId = null;
  }

  onSetValue(value: CabinetStrategyModel) {
    this.selectedId = value.ID;
    console.log(value.ID);
  }

  onReset() {
    this.router.navigate(['/trust-management'], {
      queryParams: {
        filter: null
      }
    });
    this.selectedId = null;
  }

  onSubmit() {
    this.router.navigate(['/trust-management'], {
      queryParams: {
        filter: this.selectedId
      }
    });
    setTimeout(() => {
      const ua = window.navigator.userAgent;
      const msie = ua.includes('MSIE') || ua.includes('rv:11.0');
      if (msie) {
        const top =  this.results.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
        window.scrollTo(0, top);
      } else {
        this.results.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }, 300);
    return false;
  }
}
