import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export  class ValidatorService {
  validate(rules, data) {
    let valid = true;
    const errors: string[] = [];
    const rename: any[] = [];

    // tslint:disable-next-line: forin
    for (const key in rules) {
      const error = [];
      rules[key].forEach((filter, index) => {
        error[index] = 0;
        let value = data[key];
        if (filter.optional !== undefined) {
          filter.optional.forEach(symbol => {
            const regexp = new RegExp('[' + symbol + ']', 'g');
            value = value.replace(regexp, '');
          });
        }

        if (filter.min !== undefined) {
          if (value.length < filter.min) {
            error[index] = 1;
          }
        }

        if (filter.max !== undefined) {
          if (value.length > filter.max) {
            error[index] = 1;
          }
        }

        if (filter.symbol !== undefined) {
          switch (filter.symbol) {
            case 'digit':
              if (!(new RegExp('^[0-9]+$')).test(value)) {
                error[index] = 1;
              }
              break;
            case 'letters':
              if (!(new RegExp('^[А-Яа-яёЁ]+$')).test(value)) {
                error[index] = 1;
              }
              break;
            case 'any':
            default:
            //
          }
        }

        if (filter.required !== undefined) {
          filter.required.forEach(symbol => {
            const regexp = new RegExp('[' + symbol + ']', 'g');
            if (!regexp.test(value)) {
              error[index] = 1;
            }
          });
        }

        if (filter.equal !== undefined) {
          if (value !== data[filter.equal]) {
            error[index] = 1;
          }
        }

        if (filter.fix !== undefined) {
          if (value !== filter.fix) {
            error[index] = 1;
          }
        }

      });
      if (error.every(val =>  val === 1 )) {
        valid = false;
        errors.push(rules[key][0].error);
      } else {
        let trueIndex = -1;
        error.some((trueValue, i) => {
          if (trueValue === 0) {
            trueIndex = i;
            return true;
          }
        });
        if (rules[key][trueIndex].name !== undefined) {
          const renameObject = {
            oldName: key,
            newName: rules[key][trueIndex].name
          };
          rename.push(renameObject);
        }
      }
    }
    return {
      valid: valid,
      rename: rename,
      errorMsg: errors
    };
  }
}



