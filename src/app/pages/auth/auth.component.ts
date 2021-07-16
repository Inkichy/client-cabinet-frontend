import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit {

  isLoadPreloader = false;

  constructor() {}

  ngOnInit() {
  }

  onActivate(signIn) {
    if (signIn.isLoadPreloader) { // только для определенного компонента
      signIn.isLoadPreloader.subscribe((event: boolean) => {
        this.isLoadPreloader = event;
      });
    }
  }
}
