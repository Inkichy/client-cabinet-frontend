import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-top-panel',
  templateUrl: './top-panel.component.html',
  styleUrls: ['./top-panel.component.less']
})
export class TopPanelComponent implements OnInit {
  @Input() title: string;
  @Input() smallTitle: any = false;
  @Input() modeUnderline?: boolean;
  @Output('getSelectPanel') private selectPanel = new EventEmitter;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
