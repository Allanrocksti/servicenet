import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../shared/class/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  api = environment.backendSocket;

  constructor(private httpClient: HttpClient) { }

  getClients(idMainUser) {
    return this.httpClient.get<Client[]>(`${this.api}/clients/${idMainUser}`);
  }

  getClient(id) {
    return this.httpClient.get<Client>(`${this.api}/client/${id}`);
  }

  createClient(idMainUser: string, client: Client) {
    return this.httpClient.post(`${this.api}/client/${idMainUser}`, client);
  }

  updateClient(id: number, client: Client) {
    return this.httpClient.put(`${this.api}/client/${id}`, client);
  }

  deleteClient(id) {
    return this.httpClient.delete(`${this.api}/client/${id}`);
  }

}
