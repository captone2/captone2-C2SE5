import {AbstractControl} from '@angular/forms';


export function checkDateOfBirth(control: AbstractControl) {
  const dateOfBirth = new Date(control.value);
  if (new Date().getFullYear() - dateOfBirth.getFullYear() < 13 || new Date().getFullYear() - dateOfBirth.getFullYear() > 100) {
    return {checkAge : true};
  }
  return null;
}
