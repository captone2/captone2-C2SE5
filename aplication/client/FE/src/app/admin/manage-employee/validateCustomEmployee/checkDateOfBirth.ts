import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';


export function checkDateOfBirth(control: AbstractControl, value: number): Validators | null {
  const dateOfBirth = new Date(control.value);
  if (new Date().getFullYear() - dateOfBirth.getFullYear() < 16 || new Date().getFullYear() - dateOfBirth.getFullYear() > 50) {
    return {checkAge : true};
  }
  return null;
}

// export function checkDateOfBirth(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//
//     const dateOfBirth = new Date(control.value);
//     if (new Date().getFullYear() - dateOfBirth.getFullYear() < 16 || new Date().getFullYear() - dateOfBirth.getFullYear() > 50) {
//       return {checkAge: true};
//     }
//     return null;
//   };
// }
