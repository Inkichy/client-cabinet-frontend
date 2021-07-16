import {AbstractControl} from '@angular/forms';

export class PasswordValidation {
  static matchPassword(column: string) {
    return (control: AbstractControl) => {
      const password = control.get('password').value; // to get value in input tag
      const repeatPassword = control.get(column).value; // to get value in input tag
      if (password !== repeatPassword) {
        control.get(column).setErrors({matchPassword: true});
      } else {
        return null;
      }
    };
  }
}
