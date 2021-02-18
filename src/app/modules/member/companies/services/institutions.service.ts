import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Institution } from '../models/interfaces/institution.interface';

@Injectable({
  providedIn: 'root',
})
export class InstitutionsService {
  constructor(private _http: HttpClient) {}
  getInstitutions(searchQueries?: {
    name: string;
    pid: string;
    page?: number;
  }): Observable<Institution[]> {
    const url = searchQueries
      ? `api/institutions?page=${searchQueries.page}&name=${searchQueries.name}&pid=${searchQueries.pid}`
      : 'api/institutions';
    return this._http.get<Institution[]>(url);
  }
  getInstitution(id: number): Observable<Institution> {
    return this._http.get<Institution>(`api/institutions/${id}`);
  }
  createInstitution(institution: FormData): Observable<Institution> {
    return this._http.post<Institution>('api/institutions/create', institution);
  }
  editInstitution(id: number, data: FormData) {
    return this._http.put(`api/institutions/${id}`, data);
  }
}
