import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Barkod {

  #http = inject(HttpClient);

  getStok(stokKodu: string) {
    this.#http.post('/api/1.0.1/stoklar/stok', {}, {params: {stokKodu}});
  }

}
