import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { arrayHasDuplicates } from '../../../../../lib/array-has-duplicates';

export function uniqueNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const values = control.value.split(',').map(Number);
    return arrayHasDuplicates(values) ? { hasDuplicate: true } : null;
  };
}
