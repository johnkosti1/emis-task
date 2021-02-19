import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Branch } from '../../../../models/interfaces/branch.interface';
import { Institution } from '../../../../models/interfaces/institution.interface';
import { BranchesService } from '../../../../services/branches.service';
import { InstitutionsService } from '../../../../services/institutions.service';

@Component({
  selector: 'app-create-edit-branch-dialog',
  templateUrl: './create-edit-branch-dialog.component.html',
  styleUrls: ['./create-edit-branch-dialog.component.scss'],
})
export class CreateEditBranchDialogComponent implements OnInit {
  public branchForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateEditBranchDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { institution: Observable<Institution>; id: number },
    private fb: FormBuilder,
    private _branchService: BranchesService
  ) {}
  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.fetchbranch();
    } else {
      this.initForm();
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  initForm(branch?: Branch): void {
    this.branchForm = this.fb.group({
      address: this.fb.control(
        branch ? branch.address : '',
        Validators.required
      ),
      manager_name: this.fb.control(
        branch ? branch.manager_name : '',
        Validators.required
      ),
    });
  }
  submit(): void {
    if (this.data && this.data.id) {
      this.editBranch();
    } else {
      this.createBranch();
    }
  }
  createBranch(): void {
    const data = new FormData();
    for (const key in this.branchForm.value) {
      data.append(key, this.branchForm.value[key]);
    }
    this.data.institution.subscribe((institution: Institution) => {
      this._branchService.createBranch(institution.id, data).subscribe(() => {
        this.dialogRef.close('ფილიალი წარმატებით დაემატა');
      });
    });
  }
  editBranch(): void {
    if (this.branchForm.dirty) {
      this.data.institution.subscribe((institution: Institution) => {
        this._branchService
          .editBranch(this.data.id, institution.id, this.branchForm.value)
          .subscribe(() => {
            this.dialogRef.close('ფილიალი წარმატებით დარედაქტირდა');
          });
      });
    }
  }
  fetchbranch(): void {
    this.data.institution.subscribe((inst: Institution) => {
      this._branchService.getBranch(inst.id, this.data.id).subscribe((res) => {
        this.initForm(res);
      });
    });
  }
}
