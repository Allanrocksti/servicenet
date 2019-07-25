import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPostalcode } from '../shared/class/info-postalcode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  viaCepSocket = 'https://viacep.com.br/ws/';
  mapsSocket = `https://maps.googleapis.com/maps/api/geocode/json?key=${environment.googleMapsApiKey}&address=`;

  constructor(private httpClient: HttpClient) { }

  getInfoPostalCode(postalcode: string) {
    return this.httpClient.get<InfoPostalcode>(`${this.viaCepSocket}${postalcode}/json`);
  }

  getGeometryLocation(postalcode: string) {
    return this.httpClient.get(`${this.mapsSocket}${postalcode}`);
  }

}
