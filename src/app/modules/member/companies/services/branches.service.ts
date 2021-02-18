import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Branch } from '../models/interfaces/branch.interface';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private _http: HttpClient) {}
  getBranches(institutionId: number): Observable<Branch> {
    return this._http
      .get(`api/institutions/${institutionId}/branches`)
      .pipe(map((res: any) => res.data));
  }
  getBranch(institutionId: number, branchId: number): Observable<Branch> {
    return this._http.get<Branch>(
      `api/institutions/${institutionId}/branches/${branchId}`
    );
  }
  createBranch(institutionId, data: FormData): Observable<Branch> {
    return this._http.post<Branch>(
      `api/institutions/${institutionId}/branches/create`,
      data
    );
  }
  editBranch(
    branchId: number,
    institutionId: number,
    data: FormData
  ): Observable<Branch> {
    return this._http.put<Branch>(
      `api/institutions/${institutionId}/branches/${branchId}`,
      data
    );
  }
}
