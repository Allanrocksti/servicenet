import { Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { FormClientComponent } from './form-client/form-client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

export const ClientsPagesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },
  {
    path: 'clientes',
    component: ClientsComponent
  },
  {
    path: 'clientes/adicionar',
    component: FormClientComponent
  },
  {
    path: 'clientes/detalhes',
    component: ClientDetailComponent
  },
  {
    path: '**',
    redirectTo: 'clientes'
  }
];
