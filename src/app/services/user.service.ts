import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { SharedType } from '../models/shared.type';
import { User } from '../models/user';
import { PageResponse } from '../models/page.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  readonly #http = inject(HttpClient);

  //constructor(private http: HttpClient){}//constructor injection

  async getSharedData(url: string) {
    return await lastValueFrom(this.#http.get<SharedType[]>(url));
  }

  save(user: User) {
    return this.#http.post('/api/1.0.1/users', user);
  }

  update(user: User) {
    return this.#http.put('/api/1.0.1/users', user);
  }

  getUsers(page: number, size: number):Observable<PageResponse<User>>{
    const params = new HttpParams().set('page', page).set('size', size);
    return this.#http.get<PageResponse<User>>('/api/1.0.1/users',{params});
  }

}
