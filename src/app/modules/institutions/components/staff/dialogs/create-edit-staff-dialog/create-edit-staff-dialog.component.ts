import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Institution} from '../../../../models/interfaces/institution.interface';
import {Staff} from '../../../../models/interfaces/staff.interface';
import {BranchesService} from '../../../../services/branches.service';
import {StaffService} from '../../../../services/staff.service';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-create-edit-staff-dialog',
  templateUrl: './create-edit-staff-dialog.component.html',
  styleUrls: ['./create-edit-staff-dialog.component.scss'],
})
export class CreateEditStaffDialogComponent implements OnInit {

  form: FormGroup = this.fb.group({
    pid: this.fb.control('', [
      Validators.required,
      Validators.minLength(11),
    ]),
    name: this.fb.control('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEditStaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { institutionId: number; branchId: number; staff: Staff },
    private fb: FormBuilder,
    private _staffService: StaffService
  ) {
  }

  ngOnInit(): void {
    if (this.data.staff) {
      this.form.patchValue(this.data.staff)
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.data.staff) {
      this.editStaff();
    } else {
      this.addStaff();
    }
  }

  addStaff(): void {
    if (this.form.valid) {
      if (this.form.valid) {
        this._staffService.addStaff(this.data.institutionId, this.data.branchId, this.form.value)
          .pipe(
            tap(() => this.dialogRef.close('თანამშრომელი წარმატებით დაემატა'))
          )
          .subscribe();
      }
    }
  }

  editStaff(): void {
    this._staffService
      .editStaff(
        this.data.institutionId,
        this.data.branchId,
        this.data.staff.id,
        this.form.value
      )
      .pipe(
        tap(() => this.dialogRef.close('თანამშრომელი წარმატებით დარედაქტირდა'))
      )
      .subscribe();
  }
}
