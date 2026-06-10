import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Renkler } from '../models/renkler';

@Injectable({
  providedIn: 'root',
})
export class RenklerService {

  #http = inject(HttpClient);

  renkEkle(renkler: Renkler) {
    return this.#http.post('/api/1.0.1/renkler', renkler);
  }

}
