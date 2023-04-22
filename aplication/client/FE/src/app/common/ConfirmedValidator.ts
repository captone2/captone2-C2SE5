import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Subscription} from 'rxjs';

// custom validator to check that two fields match
export function compareValidator(controlNameToCompare: string): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    if (c.value === null || c.value.length === 0){
      return null;
    }
    const controlToCompare = c.root.get(controlNameToCompare);
    if (controlToCompare){
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        c.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return controlToCompare && controlToCompare.value !== c.value ? { compare : true} : null;
  };
}
