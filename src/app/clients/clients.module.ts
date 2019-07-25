import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AgmCoreModule } from '@agm/core';

import { ClientsComponent } from './clients.component';
import { ClientsPagesRoutes } from './clients.routing';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { FormClientComponent } from './form-client/form-client.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { environment } from 'src/environments/environment';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientDetailComponent,
    FormClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientsPagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgBootstrapFormValidationModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey,
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })
  ]
})
export class ClientsModule { }
