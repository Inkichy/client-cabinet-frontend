import {ElementRef} from '@angular/core';
import {FormGroup} from '@angular/forms';

export class QBFormGroup {
  element: ElementRef;
  form: FormGroup;
  loading = false;
  smsConfirmation = false;
  open = false;
  errors = [];

  constructor(element: ElementRef, form: FormGroup) {
    this.element = element;
    this.form = form;
  }
}
