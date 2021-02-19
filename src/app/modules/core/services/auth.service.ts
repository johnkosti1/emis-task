import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(credentials: { userName: string; password: string }) {
    return this._http.post<{ token: string }>(
      `api/login?email=${credentials.userName}&password=${credentials.password}`,
      {}
    );
  }
  getUser() {
    return this._http.get('api/user');
  }

  get isLoggedIn() {
    return this.getUser().pipe(
      map(this._checkLogin),
      catchError(() => of(false))
    );
  }
  private _checkLogin(res): boolean {
    if (res && res.user) {
      return true;
    } else {
      return false;
    }
  }
}
