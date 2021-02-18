import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Institution } from '../../models/interfaces/institution.interface';
import { InstitutionsService } from '../../services/institutions.service';
import { CreateInstitutionDialogComponent } from './dialogs/create-institution-dialog/create-institution-dialog.component';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss'],
})
export class InstitutionsComponent implements OnInit {
  dataSource: Institution[] = [];
  displayedColumns: string[] = ['pid', 'name', 'number', 'actions'];
  page: {
    page: number;
    size: number;
    total: number;
  } = { page: 0, size: 10, total: 0 };
  searchForm = {
    pid: '',
    name: '',
  };
  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _institutionsService: InstitutionsService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.fetchInstitutions();
  }

  fetchInstitutions(): void {
    this._institutionsService.getInstitutions().subscribe((res: any) => {
      this.dataSource = res.data;
    });
  }
  createInstitutionDialog() {
    const dialogRef = this._dialog.open(CreateInstitutionDialogComponent, {
      disableClose: true,
      minWidth: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open(result, null, {
          horizontalPosition: 'left',
          duration: 2000,
          panelClass: 'green-snackbar',
        });
        this.fetchInstitutions();
      }
    });
  }
  editInstitution(e: Event, id: string): void {
    e.stopPropagation();
    const dialogRef = this._dialog.open(CreateInstitutionDialogComponent, {
      disableClose: true,
      minWidth: '600px',
      data: { id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open(result, null, {
          horizontalPosition: 'left',
          duration: 2000,
          panelClass: 'green-snackbar',
        });
        this.fetchInstitutions();
      }
    });
  }
  pageEvent(e: PageEvent) {
    this.page.page = e.pageIndex;
    this.page.size = e.pageSize;
  }
  initSearchForm() {
    this._fb.group({
      pid: this._fb.control(''),
      name: this._fb.control(''),
    });
  }
  searchInstitutions({ value }): void {
    if (value.name || value.pid) {
      this._institutionsService.getInstitutions(value).subscribe((res: any) => {
        this.dataSource = res.data;
      });
    }
  }
  clearSearchForm() {
    this.searchForm = {
      name: '',
      pid: '',
    };
    this.fetchInstitutions();
  }
  navigateToInstitution(institution: Institution) {
    this._router.navigate([`institutions/${institution.id}`]);
  }
}
