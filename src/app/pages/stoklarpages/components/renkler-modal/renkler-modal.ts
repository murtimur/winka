import { Component, signal } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InputComponent } from "../../../../components/input-component/input-component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ErrorMap } from '../../../../models/error.map';

@Component({
  selector: 'app-renkler-modal',
  imports: [NgbModalModule, InputComponent, FormsModule, CommonModule, ColorPickerModule],
  templateUrl: './renkler-modal.html',
  styleUrl: './renkler-modal.scss',
})
export class RenklerModal {
  constructor(private modalService: NgbModal) {}

  readonly kodu = signal('');

  readonly adi = signal('');

  readonly color: any = { r: 0, g: 0, b: 0 };

  readonly errors = signal<ErrorMap>({});

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  ekle() {
    console.log(this.color)
  }
}
