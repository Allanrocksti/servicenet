import { AbstractControl } from '@angular/forms';

export class ValidatePassword {
  static MatchPassword(abstractControl: AbstractControl) {

    if (abstractControl.root.get('password')) {

      const password = abstractControl.root.get('password').value;
      const confirmPassword = abstractControl.value;

      if (password !== confirmPassword) {
        return { notMatching : true };
      } else {
        return null;
      }

    }

    return { notMatching : true };

  }
}
