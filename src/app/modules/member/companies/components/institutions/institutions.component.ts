import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchInstitutions(this.page.page);
    // console.log(this._route.snapshot.data);
  }

  fetchInstitutions(page: number): void {
    this._institutionsService.getInstitutions(page).subscribe((res: any) => {
      this.dataSource = res.data;
      this.page.total = res.total;
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
        this.fetchInstitutions(this.page.page);
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
        this.fetchInstitutions(this.page.page);
      }
    });
  }
  initSearchForm() {
    this._fb.group({
      pid: this._fb.control(''),
      name: this._fb.control(''),
    });
  }
  searchInstitutions({ value }): void {
    if (value.name || value.pid) {
      this._institutionsService
        .getInstitutions(this.page.page, value)
        .subscribe((res: any) => {
          this.dataSource = res.data;
        });
    }
  }
  clearSearchForm() {
    this.searchForm = {
      name: '',
      pid: '',
    };
    this.fetchInstitutions(this.page.page);
  }
  navigateToInstitution(institution: Institution) {
    this._router.navigate([`institutions/${institution.id}`]);
  }
  pageEvent(e: PageEvent) {
    this.page.page = e.pageIndex;
    this.fetchInstitutions(this.page.page);
  }
}
