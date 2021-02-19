import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Branch} from '../../../../models/interfaces/branch.interface';
import {Institution} from '../../../../models/interfaces/institution.interface';
import {BranchesService} from '../../../../services/branches.service';
import {InstitutionsService} from '../../../../services/institutions.service';
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-create-edit-branch-dialog',
  templateUrl: './create-edit-branch-dialog.component.html',
  styleUrls: ['./create-edit-branch-dialog.component.scss'],
})
export class CreateEditBranchDialogComponent implements OnInit {
  public form: FormGroup = this.fb.group({
    address: this.fb.control('', Validators.required),
    manager_name: this.fb.control('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<CreateEditBranchDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { institutionId: number; branch: Branch },
    private fb: FormBuilder,
    private _branchService: BranchesService
  ) {
  }

  ngOnInit(): void {
    if (this.data.branch) {
      this.form.patchValue(this.data.branch)
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.data.branch) {
      this.editBranch();
    } else {
      this.createBranch();
    }
  }

  createBranch(): void {
    if (this.form.valid) {
      this._branchService.createBranch(this.data.institutionId, this.form.value)
        .pipe(
          tap(() => this.dialogRef.close('ფილიალი წარმატებით დაემატა'))
        )
        .subscribe();
    }
  }

  editBranch(): void {
    if (this.form.dirty && this.form.valid) {
      this._branchService
        .editBranch(this.data.branch.id, this.data.institutionId, this.form.value)
        .pipe(
          tap(() => this.dialogRef.close('ფილიალი წარმატებით დარედაქტირდა'))
        )
        .subscribe();
    }
  }
}
