import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.less']
})
export class ConfirmModalComponent {
  @Input() idToDelete: number | null;
  @Output() confirmDeletion = new EventEmitter<number | null>();

  sendConfirmDelete() {
    this.confirmDeletion.emit(this.idToDelete);
  }
}
