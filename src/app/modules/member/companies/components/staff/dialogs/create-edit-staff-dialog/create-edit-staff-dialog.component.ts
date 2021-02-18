import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Institution } from '../../../../models/interfaces/institution.interface';
import { Staff } from '../../../../models/interfaces/staff.interface';
import { BranchesService } from '../../../../services/branches.service';
import { StaffService } from '../../../../services/staff.service';

@Component({
  selector: 'app-create-edit-staff-dialog',
  templateUrl: './create-edit-staff-dialog.component.html',
  styleUrls: ['./create-edit-staff-dialog.component.scss'],
})
export class CreateEditStaffDialogComponent implements OnInit {
  staffForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateEditStaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { institutionId: number; branchId: number; id: number },
    private fb: FormBuilder,
    private _staffService: StaffService
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.getStaff();
    } else {
      this.initStaffForm();
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
  submit(): void {
    if (this.data.id) {
      this.editStaff();
    } else {
      this.addStaff();
    }
  }
  addStaff(): void {
    if (this.staffForm.valid) {
      const data = new FormData();
      for (const key in this.staffForm.value) {
        data.append(key, this.staffForm.value[key]);
      }
      this._staffService
        .addStaff(this.data.institutionId, this.data.branchId, data)
        .subscribe(() => {
          this.dialogRef.close('თანამშრომელი წარმატებით დაემატა');
        });
    }
  }
  editStaff(): void {
    const data = new FormData();
    for (const key in this.staffForm.value) {
      data.append(key, this.staffForm.value[key]);
    }
    this._staffService
      .editStaff(
        this.data.institutionId,
        this.data.branchId,
        this.data.id,
        data
      )
      .subscribe(() => {
        this.dialogRef.close('თანამშრომელი წარმატებით დარედაქტირდა');
      });
  }
  getStaff(): void {
    this._staffService
      .getStaff(this.data.institutionId, this.data.branchId, this.data.id)
      .subscribe((res: Staff) => {
        this.initStaffForm(res);
      });
  }
  initStaffForm(staff?: Staff): void {
    this.staffForm = this.fb.group({
      pid: this.fb.control(staff ? staff.pid : '', [
        Validators.required,
        Validators.minLength(11),
      ]),
      name: this.fb.control(staff ? staff.name : '', Validators.required),
    });
  }
}
