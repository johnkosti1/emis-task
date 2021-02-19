import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Branch } from '../../models/interfaces/branch.interface';
import { Institution } from '../../models/interfaces/institution.interface';
import { Staff } from '../../models/interfaces/staff.interface';
import { BranchesService } from '../../services/branches.service';
import { InstitutionsService } from '../../services/institutions.service';
import { StaffService } from '../../services/staff.service';
import { CreateEditStaffDialogComponent } from './dialogs/create-edit-staff-dialog/create-edit-staff-dialog.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  dataSource: Staff[];
  branch: Observable<Branch>;
  institution: Observable<Institution>;
  institutionId: number;
  branchId: number;
  displayedColumns = ['pid', 'name', 'actions'];
  page: {
    page: number;
    size: number;
    total: number;
  } = { page: 0, size: 10, total: 0 };
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _branchService: BranchesService,
    private _institutionService: InstitutionsService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _router: Router,
    private _staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.getIds();
    this.getBranch();
    this.fetchStaff();
    this.getInstitution();
  }
  fetchStaff() {
    this._staffService
      .getStaffList(this.institutionId, this.branchId, this.page.page)
      .subscribe((res) => {
        this.dataSource = res.data;
        this.page.total = res.total;
      });
  }
  getBranch() {
    this.branch = this._branchService.getBranch(
      this.institutionId,
      this.branchId
    );
  }
  getInstitution() {
    this.institution = this._institutionService.getInstitution(
      this.institutionId
    );
  }
  getIds() {
    this._activatedRoute.params.subscribe(
      (res: { branchId: number; institutionId: number }) => {
        this.branchId = res.branchId;
        this.institutionId = res.institutionId;
      }
    );
  }

  addStaff() {
    const dialogRef = this._dialog.open(CreateEditStaffDialogComponent, {
      disableClose: true,
      minWidth: '600px',
      data: {
        institutionId: this.institutionId,
        branchId: this.branchId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open(result, null, {
          horizontalPosition: 'left',
          duration: 2000,
          panelClass: 'green-snackbar',
        });
        this.fetchStaff();
      }
    });
  }
  editStaff(id: number) {
    const dialogRef = this._dialog.open(CreateEditStaffDialogComponent, {
      disableClose: true,
      minWidth: '600px',
      data: {
        institutionId: this.institutionId,
        branchId: this.branchId,
        id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open(result, null, {
          horizontalPosition: 'left',
          duration: 2000,
          panelClass: 'green-snackbar',
        });
        this.fetchStaff();
      }
    });
  }
  pageEvent(e: PageEvent) {
    this.page.page = e.pageIndex;
    this.fetchStaff();
  }
}
