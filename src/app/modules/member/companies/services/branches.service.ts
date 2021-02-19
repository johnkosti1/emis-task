import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DevResponse } from '../models/classes/list.response';
import { Branch } from '../models/interfaces/branch.interface';
import { Institution } from '../models/interfaces/institution.interface';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private _http: HttpClient) {}
  getBranches(
    institutionId: number,
    page: number
  ): Observable<DevResponse<Branch[]>> {
    return this._http.get<DevResponse<Branch[]>>(
      `api/institutions/${institutionId}/branches?page=${page + 1}`
    );
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
    data: { address: string; manager_name: string }
  ): Observable<Branch> {
    return this._http.put<Branch>(
      `api/institutions/${institutionId}/branches/${branchId}?manager_name=${data.manager_name}&address=${data.address}`,
      {}
    );
  }
}
