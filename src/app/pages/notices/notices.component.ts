import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChildren,
  QueryList,
  ViewChild,
  Renderer2,
} from "@angular/core";
import { parseErrors } from "../../core/utls/parse-error.utls";
import { CabinetService } from "../../core/services/api/cabinet.service";
import { CabinetDataModel } from "src/app/core/models/cabinet-data.model";
import { subscribeFCM } from "../../../firebase-notices/firebase_subscribe";
import { fromEvent, Subscription } from "rxjs";

@Component({
  selector: "app-notices",
  templateUrl: "./notices.component.html",
  styleUrls: ["./notices.component.less"],
})
export class NoticesComponent implements OnInit, OnDestroy {
  @ViewChildren("ipoNotices") ipoNotices: QueryList<ElementRef>;
  @ViewChild("ipoTicker") ipoTicker: ElementRef;

  сabinetData: CabinetDataModel;
  subscriptions: Subscription[] = [];
  public notices: Array<any> = [];
  public year: string;
  public years: any[] = [];
  errors = [];
  ipoNoticesList = [];
  isLoadedNotices = false;
  isNotices = false;
  tickerName: string;
  isHugeNotice = false;

  constructor(
    private cabinetService: CabinetService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.cabinetService.dataSubject.subscribe((data) => {
      this.сabinetData = data;
    });
    // Check for service worker
    this.isNotices = true;
    subscribeFCM();
    const subscription = this.cabinetService.getNoticesYears().subscribe(
      (data) => {
        this.years = data;
        this.years.reverse();

        this.years = this.years.map((year) => {
          return {
            year: year,
            isActive: false,
          };
        });

        this.getNotices(this.years[0]);
      },
      (error) => {
        this.errors = parseErrors(error.error.errorMsg);
      }
    );

    subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((item: Subscription) => item.unsubscribe());
  }

  getNotices(yearEl) {
    this.isLoadedNotices = false;
    for (const year of this.years) {
      if (year !== yearEl) {
        year.isActive = false;
      } else {
        year.isActive = true;
      }
    }

    this.cabinetService.getNotices(yearEl.year).subscribe(
      (items) => {

          this.notices = items.data;
          this.isLoadedNotices = true;
          if (this.сabinetData.notification.new) {
            this.сabinetData.notification.new = false;
            this.cabinetService.dataSubject.next(this.сabinetData);
          }
          if (this.notices.length) {
          this.linkWrapper();
          this.checkNoticeHeight();
          }
          const ids = [];
          this.notices.map((_) => {
            if (_.viewed === '') {
              ids.push(_.id);
            }
          });

          if (ids.length !== 0) {
            this.cabinetService.setViewedNotices(ids).subscribe();
          }
      },
      (error) => {
        this.errors = parseErrors(error.error.errorMsg);
      }
    );
  }

  setTickerName() {
    let targetTickerName: any;
    const tickerLink = document.querySelectorAll(".ipo-link");
    const linkClick$ = fromEvent(tickerLink, "click");
    linkClick$.subscribe((event) => {
      targetTickerName = event.target;
      this.tickerName = targetTickerName.dataset.tickerName;
    });
  }

  getFile(fileId) {
    const url = "api/cabinet/notices/getFile";
    const data = {
      id: fileId,
    };

    const params = [
      `download=false`,
      `api_url=${url}`,
      `type=application/pdf`,
      `data=${JSON.stringify(data)}`,
      `method=post`,
    ].join("&");

    window.open(`/documents_page?${params}`);
  }

  linkWrapper() {
    this.ipoNotices.changes.subscribe((notices) => {
      notices.forEach((item) => {
        const noticeText = item.nativeElement.children[1].children[1].children;
        Array.from(noticeText)
          .filter((c: any) => c.className.includes("ycf__finance-text"))
          .forEach((c: any) => {
            const result = c.innerHTML.match(/\$\w+/gm);
            if (result !== null) {
              c.innerHTML = c.innerHTML.replace(
                /\$\w+/gm,
                (match) =>
                  `<a class='ycf__finance-link ipo-link' data-fancybox data-src='#ipo-assignment' data-ticker-name='${match.replace(
                    /\$/gm,
                    ""
                  )}'>${match}</a>`
              );
            }
          });
      });
      this.setTickerName();
    });
  }
  checkNoticeHeight(): void {
    const maxHeight = 84;
    let currentItem;
    let currentHeight;
    this.ipoNotices.changes.subscribe((notices) => {
      notices.map((item, i) => {
        currentItem = item.nativeElement.children[1].children[1].children[0];
        currentHeight =
          item.nativeElement.children[1].children[1].children[0].offsetHeight;
        if (currentHeight > maxHeight) {
          this.notices[i].isHugeNotice = true;
          this.renderer.addClass(currentItem, "closed");
        }
      });
    });
  }

  toggle($event): void {
    const target = this.renderer.parentNode($event.target).firstChild;
    if (!target.className.includes("closed")) {
      this.renderer.addClass(target, "closed");
      $event.target.innerHTML = "Подробнее";
    } else {
      this.renderer.removeClass(target, "closed");
      $event.target.innerHTML = "Скрыть";
    }
  }
}
