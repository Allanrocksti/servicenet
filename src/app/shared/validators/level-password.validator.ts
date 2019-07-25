

export function StrongPassword(control: AbstractControl): {[key: string]: boolean} | null {
    const password: string = String(control.value);
    if (!password.match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)) {
      return { 'strongPassword': false }
    }
    return null;

}

import { AbstractControl } from '@angular/forms';

export class LevelPassword {
  static StrongPassword(abstractControl: AbstractControl) {

    if (abstractControl.root.get('password')) {

      const password = abstractControl.root.get('password').value;

      if (!password.match(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)) {
        return { strongPassword: true };
      } else {
        return null;
      }

    }

    return { strongPassword: true };

  }
}
