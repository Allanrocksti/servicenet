import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

export const LoginPagesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
