import { Component, OnInit} from '@angular/core';

declare var accordion;

@Component({
  selector: 'faq',
  templateUrl: 'faq.component.html',
  styleUrls: ['faq.component.less']
})
export class FaqComponent implements OnInit {
  ngOnInit() {
    let i;
    const trying = setInterval(() => {
      try {
        window['accordion']();
        clearInterval(trying);
      } catch (e) {
        i++;
        if (i > 10) {
        clearInterval(trying);
        }
      }
    }, 100);
  }
}
