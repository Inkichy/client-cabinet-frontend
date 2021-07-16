import { Component, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AvailableNoticeModel, CabinetDataModel } from 'src/app/core/models/cabinet-data.model';
import { CabinetService } from 'src/app/core/services/api/cabinet.service';

declare const $: any;
declare global {
  interface ObjectConstructor {
    fromEntries(xs: [string | number | symbol, any][]): object;
  }
}

@Component({
  selector: 'notices-list',
  templateUrl: 'notices-list.modal.html',
  styleUrls: ['notices-list.modal.less'],
})
export class NoticesListModal implements OnInit {
  data: CabinetDataModel;
  notices: AvailableNoticeModel[];

  noticesGroup: FormGroup;
  subscriptions: FormArray;
  formStatus: object = {};
  step = 1;
  isLoading = false;
  isShow = true;

  constructor(
    private cabinetService: CabinetService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cabinetService.dataSubject.subscribe((res: CabinetDataModel) => {
      this.data = res;
      if (this.data) {
        this.notices = this.data.notification.groups;
      }
    });

    this.noticesGroup = this.formBuilder.group({
      subscriptions: this.formBuilder.array([]),
    });
    this.createInput();
    this.getFormStatus();
    this.checkUrl();
  }

  get formData() {
      return this.noticesGroup.get('subscriptions') as FormArray;
  }

    createInput() {
        if (this.notices && this.notices.length) {
          this.notices.map((item) => {
            this.formData.push(
              this.formBuilder.group({
                [item.fieldName]: [item.active]
              })
            );
          });
        }
    }

  setNotices(): void {
    this.isLoading = true;
    this.step = 2;
    this.cabinetService.setNoticeStatuses(this.noticesGroup.value).subscribe(async (response) => {
        if (response) {
          this.isLoading = false;
          setTimeout(() => {
            this.resetForm();
            this.step = 1;
          }, 1500);
          this.data.notification.groups.map((item, i) => {
            return item.active = this.noticesGroup.value.subscriptions[i][`${item.fieldName}`];
          });
          this.cabinetService.dataSubject.next(this.data);
        }
      });
  }

  resetForm(): void {
    $.fancybox.close();
  }

  getFormStatus(): object {
    let entries;
    let objFromEntries: object;
    for (const item of this.notices) {
      entries = new Map([[item.fieldName, item.active]]);
      objFromEntries = Object.fromEntries(entries);
      Object.assign(this.formStatus, objFromEntries);
    }
    return this.formStatus;
  }

  checkUrl() {
    this.router.events.subscribe((evt: Event) => {
      if (evt instanceof NavigationEnd && this.router.url.indexOf('/functions') === -1 ) {
        this.isShow = false;
        this.resetForm();
      }
    });
  }
}
