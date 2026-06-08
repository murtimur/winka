import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastr = inject(ToastrService);
  private defaultConfig = {
    positionClass: 'toast-bottom-center',
    timeOut: 5000,
    progressBar: true,
    closeButton: true,
    preventDuplicates: true,
  }

  success(message: string, title = 'Başarılı') {
    this.toastr.success(message, title, this.defaultConfig);
  }

  error(message: string, title = 'Hata') {
    this.toastr.error(message, title, this.defaultConfig);
  }

  warning(message: string, title = 'Uyarı') {
    this.toastr.warning(message, title, this.defaultConfig);
  }

  info(message: string, title = 'Bilgi') {
    this.toastr.info(message, title, this.defaultConfig);
  }
}
