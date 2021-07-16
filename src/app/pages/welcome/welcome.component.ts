import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

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
