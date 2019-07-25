import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  displayName = '';
  isShown = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().then(res => {
      this.displayName = res['displayName'];
    }, err => {
      console.error('erro');
    });
  }

  logoff() {

    this.authService.doLogout().then(res => {
      this.router.navigate(['/auth/login']);
    }, err => {
      console.log(err);
    });

  }

}
