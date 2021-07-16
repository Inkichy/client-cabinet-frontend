import {Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';

declare var jQuery: any;

@Directive({
  selector: '[slick]'
})
export class SlickDirective implements OnDestroy, OnInit, OnChanges {
  private element;
  private timeout;
  @Input() items: [];
  @Input() responsive;

  constructor(el: ElementRef) {
    this.element = el;
  }

  initSlick() {
    const $el = jQuery(this.element.nativeElement);

    try {
      $el.find('.slick-slide').remove().end().slick('unslick');
    } catch (e) {}

    const arParams = {
      dots: true,
      arrows: false,
      // infinite: true,
      speed: 600,
      slidesToShow: $el.data('slides') || 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      variableWidth: false
    };

    if (this.responsive) {
      arParams['responsive'] = [
        {
          breakpoint: 1501,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ];
    }

    $el.slick(arParams);
  }

  ngOnInit() {
    this.timeout = setTimeout(() => {
      this.initSlick();
    }, 200);
  }

  ngOnDestroy(): void {
    const $el = jQuery(this.element.nativeElement);
    try {
      $el.find('.slick-slide').remove().end().slick('unslick');
    } catch (e) {}
  }

  ngOnChanges() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.initSlick();
    }, 200);
  }
}

@Directive({
  selector: '[slickPrev]'
})
export class SlickPrevDirective {
  constructor(el: ElementRef) {
    setTimeout(() => {
      jQuery(el.nativeElement).click(() => {
        jQuery(el.nativeElement)
          .parents('div')
          .find('div[slick]')
          .slick('slickPrev');
      });
    });
  }
}

@Directive({
  selector: '[slickNext]'
})
export class SlickNextDirective {
  constructor(el: ElementRef) {
    setTimeout(() => {
      jQuery(el.nativeElement).click(() => {
        jQuery(el.nativeElement)
          .parents('div')
          .find('div[slick]')
          .slick('slickNext');
      });
    });
  }
}
