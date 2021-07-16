import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: 'shortnumber'
})
export class ShortnumberPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {

  }

  transform(value: any, ...args: any[]): SafeHtml {
    if (value > 1000000) {
      value = Math.round(value /  10000) / 100 + '&nbsp;млн.';
    } else if (value > 1000) {
      value = Math.round(value /  1000) + '&nbsp;тыс.';
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
