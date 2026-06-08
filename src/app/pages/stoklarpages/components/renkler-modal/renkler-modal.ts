import { Component } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InputComponent } from "../../../../components/input-component/input-component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-renkler-modal',
  imports: [NgbModalModule, InputComponent, FormsModule, CommonModule],
  templateUrl: './renkler-modal.html',
  styleUrl: './renkler-modal.scss',
})
export class RenklerModal {
  constructor(private modalService: NgbModal) {}

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  ekle() {
    console.log('Ekleme Başarılı!')
  }
}
