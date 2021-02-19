import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DevResponse } from '../models/classes/list.response';
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
  getStaffList(
    institutionId: number,
    branchId: number,
    page: number
  ): Observable<DevResponse<Staff[]>> {
    return this._http.get<DevResponse<Staff[]>>(
      `api/institutions/${institutionId}/branches/${branchId}/personal?page=${page+1} `
    );
  }
  editStaff(
    institutionId: number,
    branchId: number,
    staffId: number,
    data: { pid: number; name: string }
  ): Observable<Staff> {
    return this._http.put<Staff>(
      `api/institutions/${institutionId}/branches/${branchId}/personal/${staffId}?name=${data.name}&pid=${data.pid}`,
      {}
    );
  }
}
