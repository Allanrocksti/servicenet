import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { Client } from '../shared/class/client';
import { ClientsService } from 'src/app/services/clients.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';

declare interface DataTable {
  headerRow: string[];
  dataRows: Client[];
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  dataTable: DataTable;
  modalRef: BsModalRef;
  clients: Client[] = [];
  loading = false;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {

    this.pushClients();

    this.dataTable = {
      headerRow: ['#', 'Nome', 'Telefone', 'Endereço', 'Ações'],
      dataRows: this.clients
    };
  }

  pushClients() {

    this.loading = true;

    this.clientsService.getClients(localStorage.getItem('currentUser'))
        .subscribe(res => {
          this.loading = false;
          this.clients = res;
          this.dataTable.dataRows = this.clients;
        }, err => {
          this.loading = false;
          this.showModalLoginMessage('Falha na conexão', 'Tente novamente mais tarde!');
        });
  }

  navigateToClientDetails(id) {
    this.router.navigate(['/admin/clientes/detalhes'], { queryParams: { id } });
  }

  navigateToEditClient(id) {
    this.router.navigate(['/admin/clientes/adicionar'], { queryParams: { id } });
  }

  deleteClient(id) {
    this.modalRef.hide();
    this.loading = true;
    this.clientsService.deleteClient(id)
        .subscribe(res => {
          this.loading = false;
          this.pushClients();
        }, err => {
          this.loading = false;
          this.showModalLoginMessage('Falha na conexão', 'Não foi possível excluir o cliente, tente novamente mais tarde!');
        });
  }

  showModalDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  isMobile() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  showModalLoginMessage(modalTitle: string, modalBody: string) {
    const initialState = {
      title: modalTitle,
      closeBtnName: 'Fechar',
      body: modalBody
    };
    this.modalRef = this.modalService.show(ModalContentComponent, {initialState});
  }

}
