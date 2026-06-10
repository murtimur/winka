import { Component, signal } from '@angular/core';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InputComponent } from '../../../../components/input-component/input-component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ErrorMap } from '../../../../models/error.map';
import { Renkler } from '../../../../models/renkler';
import { RenklerService } from '../../../../services/renkler.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-renkler-modal',
  imports: [NgbModalModule, InputComponent, FormsModule, CommonModule, ColorPickerModule],
  templateUrl: './renkler-modal.html',
  styleUrl: './renkler-modal.scss',
})
export class RenklerModal {
  constructor(private modalService: NgbModal, private renklerService: RenklerService, private toastrService: ToastService) {}

  readonly errors = signal<ErrorMap>({});

  renk = signal<Renkler>({
    adi: '',
    kodu: '',
    id: 0,
    renk: { r: 0, g: 0, b: 0 },
  });

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }

  onFieldChange<K extends keyof Renkler>(key: K, value: Renkler[K]) {
    this.renk.set({
      ...this.renk(),
      [key]: value,
    });
    this.clearError(key as string);
  }

  clearError(field: string) {
    if (!this.errors()[field]) return;
    this.errors.update((e) => {
      const copy = { ...e };
      delete copy[field];
      return copy;
    });
  }

  ekle() {
    try {
      this.renklerService.renkEkle(this.renk()).subscribe({
        next: ()=> this.toastrService.success('Renk eklendi.'),
        error: (err) => console.log(err)
      });
    } catch (error) {
      console.log(error);
      this.toastrService.error('Renk eklenemedi!')
    }
  }
}
