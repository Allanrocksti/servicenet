import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser().then(user => {
        return resolve(true);
      }, err => {
        this.router.navigate(['/auth/login']);
        return resolve(false);
      });
    });
  }

}
