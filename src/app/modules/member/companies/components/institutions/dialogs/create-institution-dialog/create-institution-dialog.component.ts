import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Institution } from '../../../../models/interfaces/institution.interface';
import { InstitutionsService } from '../../../../services/institutions.service';

@Component({
  selector: 'app-create-institution-dialog',
  templateUrl: './create-institution-dialog.component.html',
  styleUrls: ['./create-institution-dialog.component.scss'],
})
export class CreateInstitutionDialogComponent implements OnInit {
  public institutionForm: FormGroup;
  institution: Institution;
  constructor(
    public dialogRef: MatDialogRef<CreateInstitutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private fb: FormBuilder,
    private _institutionsService: InstitutionsService
  ) {}
  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.fetchInstitution();
    } else {
      this.initForm();
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  initForm(institution?: Institution): void {
    this.institutionForm = this.fb.group({
      pid: this.fb.control(institution ? institution.pid : ''),
      name: this.fb.control(
        institution ? institution.name : '',
        Validators.required
      ),
      number: this.fb.control(
        institution ? institution.number : '',
        Validators.required
      ),
    });
  }
  submit() {
    if (this.data && this.data.id) {
      this.editInstitution();
    } else {
      this.createInstitution();
    }
  }
  createInstitution() {
    if (this.institutionForm.valid) {
      const data = new FormData();
      for (const key in this.institutionForm.value) {
        data.append(key, this.institutionForm.value[key]);
      }
      this._institutionsService.createInstitution(data).subscribe(() => {
        this.dialogRef.close('დაწესებულება წარმატებით დაემატა');
      });
    }
  }
  editInstitution() {
    if (this.institutionForm.dirty) {
      const data = new FormData();
      for (const key in this.institutionForm.value) {
        data.append(key, this.institutionForm.value[key]);
      }
      this._institutionsService
        .editInstitution(this.data.id, data)
        .subscribe(() => {
          this.dialogRef.close('დაწესებულება წარმატებით დარედაქტირდა');
        });
    }
  }
  fetchInstitution() {
    this._institutionsService.getInstitution(this.data.id).subscribe((res) => {
      this.initForm(res);
    });
  }
}
