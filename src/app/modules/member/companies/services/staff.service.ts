import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../models/interfaces/staff.interface';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private _http: HttpClient) {}
  addStaff(
    institutionId: number,
    branchId: number,
    data: FormData
  ): Observable<Staff> {
    return this._http.post<Staff>(
      `api/institutions/${institutionId}/branches/${branchId}/personal/create`,
      data
    );
  }
  getStaff(
    institutionId: number,
    branchId: number,
    staffId: number
  ): Observable<Staff> {
    return this._http.get<Staff>(
      `api/institutions/${institutionId}/branches/${branchId}/personal/${staffId}`
    );
  }
  getStaffList(institutionId: number, branchId: number) {
    return this._http.get(
      `api/institutions/${institutionId}/branches/${branchId}/personal `
    );
  }
  editStaff(
    institutionId: number,
    branchId: number,
    staffId: number,
    data: FormData
  ): Observable<Staff> {
    return this._http.put<Staff>(
      `api/institutions/${institutionId}/branches/${branchId}/personal/${staffId}`,
      data
    );
  }
}
