import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DevResponse } from '../models/classes/dev-response';
import { Institution } from '../models/interfaces/institution.interface';

@Injectable({
  providedIn: 'root',
})
export class InstitutionsService {
  constructor(private _http: HttpClient) {}
  getInstitutions(
    page: number,
    searchQueries: {
      name?: string;
      pid?: string;
    } = {}
  ) {
    return this._http.get<DevResponse<Institution[]>>(`api/institutions?page=${page + 1}`, {
      params: searchQueries
    });
  }
  getInstitution(id: number): Observable<Institution> {
    return this._http.get<Institution>(`api/institutions/${id}`);
  }
  createInstitution(institution: FormData): Observable<Institution> {
    return this._http.post<Institution>('api/institutions/create', institution);
  }
  editInstitution(
    id: number,
    data: { pid: string; number: string; name: string }
  ) {
    return this._http.put(
      `api/institutions/${id}?pid=${data.pid}&name=${data.name}&number=${data.number}`,
      data
    );
  }
}
