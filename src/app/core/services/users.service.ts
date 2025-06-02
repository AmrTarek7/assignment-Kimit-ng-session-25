import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private $BASE_URL = 'http://localhost:3000/users';
  constructor() {}

  private _httpClient = inject(HttpClient);

  addUser(user: any): Observable<any> {
    return this._httpClient.post(this.$BASE_URL, user);
  }
  //
  getUsers(): Observable<any> {
    return this._httpClient.get(this.$BASE_URL);
  }
  //

  deleteUser(id: string): Observable<any> {
    return this._httpClient.delete(`${this.$BASE_URL}/${id}`);
  }
}
