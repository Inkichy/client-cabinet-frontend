import {Directive, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {environment} from '../../../environments/environment';

declare var jQuery: any;

@Directive({
  selector: '[dadata]'
})
export class DadataDirective {
  @Output() onChange = new EventEmitter();
  @Input() dadata: string;

  constructor(el: ElementRef) {
    setTimeout(() => {
      jQuery(el.nativeElement).suggestions({
        token: environment.dadataApiToken,
        type: this.dadata || 'ADDRESS',
        onSelect: (data) => {
          this.onChange.emit(data);
        }
      });
    });
  }
}
