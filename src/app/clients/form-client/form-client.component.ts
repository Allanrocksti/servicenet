import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/shared/class/client';
import { ClientsService } from 'src/app/services/clients.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from 'src/app/shared/modal-content/modal-content.component';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {

  form: FormGroup;
  client: Client;
  isEditClient: boolean;
  lat: number;
  lng: number;
  zoom = 15;
  notLatLgn: boolean;
  loading = false;
  modalRef: BsModalRef;
  regexTextFields = /^[a-zA-Z\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]*$/;

  customErrorMessages: any[] = [
    {
      error: 'minlength',
      format: (label, error) => 'Tem certeza que é só isso mesmo? Tente novamente!'
    },
    {
      error: 'required',
      format: (label, error) => 'Não esqueça desse campo ;)'
    },
    {
      error: 'pattern',
      format: (label, error) => 'Tem certeza que este campo está correto? Tente novamente!'
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private router: Router,
    private bsModalService: BsModalService,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.regexTextFields)]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      postalcode: ['', [Validators.required, Validators.minLength(8)]],
      street: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.regexTextFields)]],
      num: ['', Validators.required],
      country: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.regexTextFields)]],
      country_state: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.regexTextFields)]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.regexTextFields)]]
    });

    this.setEditClient();

  }

  setEditClient() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.id) {
        this.isEditClient = true;
        this.pushClient(params.id);
      } else {
        this.isEditClient = false;
      }
    });
  }

  pushClient(id) {
    this.loading = true;
    this.clientsService.getClient(id)
        .subscribe(res => {
          this.loading = false;
          this.client = res[0];
          this.form.patchValue(this.client);
          this.getGeometryLocation(this.client.postalcode);
        }, err => {
          this.loading = false;
          this.showModalLoginMessage('Falha ao carregar os dados do cliente', 'Você está sendo redirecionado para a página de clientes!');
          this.router.navigate(['/admin/clients']);
        });
  }

  onSubmit() {

    this.loading = true;

    if (this.isEditClient) {
      if (this.form.valid) {
        this.clientsService.updateClient(this.client.id_client, this.form.value)
          .subscribe(res => {
            this.loading = false;
            this.router.navigate(['/admin/clients']);
          }, err => {
            this.loading = false;
            this.showModalLoginMessage('Falha na conexão', 'Falha ao salvar o cliente, tente novamente mais tarde !');
          });
      } else {
        this.loading = false;
        this.showModalLoginMessage('Campos incorretos', 'Preencha todos os campos corretamente e tente novamente');
      }
    } else {
      if (this.form.valid) {
        this.clientsService.createClient(localStorage.getItem('currentUser'), this.form.value)
          .subscribe(res => {
            this.loading = false;
            this.router.navigate(['/admin/clients']);
          }, err => {
            this.loading = false;
            this.showModalLoginMessage('Falha na conexão', 'Falha ao salvar o cliente, tente novamente mais tarde !');
          });
      } else {
        this.loading = false;
        this.showModalLoginMessage('Campos incorretos', 'Preencha todos os campos corretamente e tente novamente');
      }
    }

  }

  getInfoPostalcode() {

    this.loading = true;
    const postalcode = this.form.get('postalcode').value;

    if (this.form.get('postalcode').valid) {
      this.locationService.getInfoPostalCode(postalcode).subscribe(res => {
        this.loading = false;
        if (!res['erro']) {
          this.form.patchValue({
            street: res.logradouro,
            country: 'Brasil',
            country_state: res.uf,
            city: res.localidade,
          });
        }
      });

      this.getGeometryLocation(postalcode);

    } else {
      this.loading = false;
    }

  }

  getGeometryLocation(postalcode) {
    this.loading = true;
    if (this.form.get('postalcode').valid) {
      this.locationService.getGeometryLocation(postalcode).subscribe(res => {
        this.loading = false;
        if (res['results'][0]) {
          this.lat = res['results'][0]['geometry']['location']['lat'];
          this.lng = res['results'][0]['geometry']['location']['lng'];
          this.notLatLgn = false;
        } else {
          this.notLatLgn = true;
        }
      }, err => {
        this.loading = false;
        this.notLatLgn = true;
      });
    } else {
      this.loading = false;
    }
  }

  showModalLoginMessage(modalTitle: string, modalBody: string) {
    const initialState = {
      title: modalTitle,
      closeBtnName: 'Fechar',
      body: modalBody
    };
    this.modalRef = this.bsModalService.show(ModalContentComponent, {initialState});
  }

}
