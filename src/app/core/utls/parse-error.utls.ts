import {isString} from 'util';

/**
 * Парсинг ошибок с апи
 *
 * @param value any
 */
export function parseErrors(value: any) {
  const errors = [];
  if (isString(value)) {
    errors.push(value);
  } else {
    value.forEach(errorMsgs => {
      if (isString(errorMsgs)) {
        errors.push(errorMsgs);
      } else {
        for (const errorAttribute in errorMsgs) {
          for (const errorCode in errorMsgs[errorAttribute]) {
            errors.push(errorMsgs[errorAttribute][errorCode]);
          }
        }
      }
    });
  }

  return errors;
}
