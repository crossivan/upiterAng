import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Checks equals two or more form fields in form group
 */
export function appValidEqualFactory(items: string[], key: string): ValidatorFn {
  return (control: AbstractControl) => {
    if (control instanceof FormGroup) {
      let first = control.controls[items[0]].value;
      for (let i = 1; i < items.length; i++) {
        let current = control.controls[items[i]].value;
        if (current !== first) {
          return {
            customKey: {
              key
            }
          };
        }
      }
    }
    return null;
  };
}

