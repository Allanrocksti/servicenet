import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { User } from 'src/app/shared/class/user';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatePassword } from 'src/app/shared/validators/validate-password';
import { ModalContentComponent } from 'src/app/shared/modal-content/modal-content.component';
import { LevelPassword } from 'src/app/shared/validators/level-password.validator';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;
  user: User;
  modalRef: BsModalRef;
  loading = false;

  customErrorMessages: any[] = [
    {
      error: 'minlength',
      format: (label, error) => 'Tem certeza que esse é seu nome?'
    },
    {
      error: 'strongPassword',
      format: (label, error) => 'Digite uma senha com no mínimo 6 caracteres, incluindo letras e números !'
    },
    {
      error: 'email',
      format: (label, error) => 'Email inválido, tente novamente !'
    },
    {
      error: 'pattern',
      format: (label, error) => 'Tem certeza que este campo está correto? Tente novamente!'
    },
    {
      error: 'required',
      format: (label, error) => 'Não esqueça desse campo ;)'
    },
    {
      error: 'notMatching',
      format: (label, error) => 'As senhas não coincidem, tente novamente !'
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private bsModalService: BsModalService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\sáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, LevelPassword.StrongPassword]],
      confirmPassword: ['', [Validators.required, ValidatePassword.MatchPassword]]
    });

  }

  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      this.authService.doRegister(this.form.value).then(res => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
      }).catch(err => {
        this.loading = false;
        if (err.code === 'auth/email-already-in-use'){
          this.showModalLoginMessage('Email já cadastrado!',
            'Você será redirecionado para a página de login, insira as credenciais ou entre com o Facebook !');
          this.router.navigate(['/auth/login']);
        } else {
          this.showModalLoginMessage('Falha na conexão', 'Tente novamente mais tarde!');
        }
      });
    } else {
      this.loading = false;
      this.showModalLoginMessage('Campos incorretos', 'Preencha todos os campos corretamente e tente novamente');
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
