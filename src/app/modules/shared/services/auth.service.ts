import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}
  login(credentials: { userName: string; password: string }) {
    return this._http.post(
      `api/login?email=${credentials.userName}&password=${credentials.password}`,
      {}
    );
  }
  getUser() {
    return this._http.get('api/user');
  }
}
