import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.less']
})
export class AuthModalComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() link: string;
}
