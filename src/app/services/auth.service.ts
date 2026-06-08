import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #http = inject(HttpClient);

  login(body: any) {
    return this.#http.post<AuthResponse>('/api/1.0.1/auth', body);
  }

  logout() {
    return this.#http.post<AuthResponse>('/api/1.0.1/logout', {});
  }
}
