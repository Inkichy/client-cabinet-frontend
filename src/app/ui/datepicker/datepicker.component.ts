import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
})
export class DatepickerComponent implements OnInit {
  @ViewChild('input') elRef: ElementRef;

  @Output() onChangeDate = new EventEmitter();
  @Input() placeholder: string;
  @Input() position = 'right top';
  @Input() date;

  constructor() {
    setTimeout(() => {
      jQuery(this.elRef.nativeElement).datepicker({
        multipleDates: false,
        gotoCurrent: true,
        defaultDate: this.date,
          onSelect: (formattedDate: string, date: Date | [], inst: any) => {
          this.onChangeDate.emit(formattedDate);
        }
      });
    });
  }
  ngOnInit() {
    // console.log(this.date);
  }
  change($event) {
    this.onChangeDate.emit($event.target.value);
  }
}
