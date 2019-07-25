import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../shared/modal-content/modal-content.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  modalRef: BsModalRef;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private bsModalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      this.authService.doLogin(this.form.value).then(res => {
        localStorage.setItem('currentUser', res.user.uid);
        this.router.navigate(['/admin/clientes']);
        this.loading = false;
      }, err => {
        this.loading = false;
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          this.showModalLoginMessage('Credênciais incorretas', 'Preencha todos os campos corretamente!');
        } else {
          this.loading = false;
          this.showModalLoginMessage('Falha na conexão', 'Tente novamente mais tarde!');
        }
      });
    } else {
      this.showModalLoginMessage('Campos inválidos', 'Preencha todos os campos corretamente!');
    }
  }

  loginFacebook() {
    this.loading = true;
    this.authService.doFacebookLogin().then(res => {
      this.loading = false;
      this.router.navigate(['/admin/clientes']);
    }, err => {
      this.loading = false;
      this.showModalLoginMessage('Falha na conexão', 'Tente novamente mais tarde!');
    });
  }

  showModalLoginMessage(modalTitle: string, modalBody: string) {
    const initialState = {
      title: modalTitle,
      closeBtnName: 'Fechar',
      body: modalBody
    };
    this.modalRef = this.bsModalService.show(ModalContentComponent, {initialState});
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

}
