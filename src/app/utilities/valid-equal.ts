import { FormGroup } from '@angular/forms';

/**
 * Checks equals two or more form fields in form group
 */
export function appValidEqualFactory(items: string[], key: string) {
    return (group: FormGroup) => {
        let first = group.controls[items[0]].value;
        for (let i = 1; i < items.length; i++) {
            let current = group.controls[items[i]].value;

            if (current !== first) {
                return {
                    customKey: {
                        key
                    }
                };
            }
        }
        return null;
    };
}
