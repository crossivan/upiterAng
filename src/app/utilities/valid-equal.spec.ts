import { FormControl, FormGroup } from '@angular/forms';
import { appValidEqualFactory } from './valid-equal';

describe('appValidEqualFactory', () => {
    let form: any;

    beforeEach(() => {
        form = new FormGroup({
            first: new FormControl(''),
            second: new FormControl('')
        });

        form.setValidators(appValidEqualFactory(['first', 'second'], 'VALIDATION.ERROR'));
    });

    it('should be valid for empty', () => {
        expect(form.valid).toBe(true);
    });

    it('should be valid for equal', () => {
        form.get('first').setValue('value');
        form.get('second').setValue('value');
        expect(form.valid).toBe(true);
    });

    it('should be invalid for not equal', () => {
        form.get('first').setValue('value1');
        form.get('second').setValue('value2');
        expect(form.valid).toBe(false);
    });

    it('should provide error for invalid', () => {
        form.get('first').setValue('value1');
        form.get('second').setValue('value2');
        expect(form.errors.customKey.key).toBe('VALIDATION.ERROR');
    });
});
