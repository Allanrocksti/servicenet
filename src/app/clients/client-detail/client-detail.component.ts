import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/class/client';
import { ClientsService } from 'src/app/services/clients.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  idClient: string;
  client: Client;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientsService: ClientsService
  ) { }

  ngOnInit() {
    this.pushIdClient();
    this.pushClient();
  }

  pushIdClient(): any {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.id) {
        this.idClient = params.id;
      } else {
        console.log('error');
        return null;
      }
    });
  }

  pushClient() {
    this.clientsService.getClient(this.idClient)
      .subscribe(res => {
        this.client = res[0];
      }, err => {
          console.log('error');
      });
  }

}
