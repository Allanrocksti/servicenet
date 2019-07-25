import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {

  title: string;
  closeBtnName: string;
  body: string;

  constructor(private bsModalRef: BsModalRef) { }

  ngOnInit() { }

  modalHide() {
    this.bsModalRef.hide();
  }

}
