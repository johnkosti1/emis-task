import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Branch } from '../../models/interfaces/branch.interface';
import { BranchesService } from '../../services/branches.service';
import { InstitutionsService } from '../../services/institutions.service';
import { CreateEditStaffDialogComponent } from './dialogs/create-edit-staff-dialog/create-edit-staff-dialog.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  branch: Observable<Branch>;
  institutionId: number;
  branchId: number;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _branchService: BranchesService,
    private _institutionService: InstitutionsService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getIds();
    this.getBranch();
  }
  getIds() {
    this._activatedRoute.params.subscribe(
      (res: { branchId: number; institutionId: number }) => {
        this.branchId = res.branchId;
        this.institutionId = res.institutionId;
      }
    );
  }
  getBranch() {
    this.branch = this._branchService.getBranch(
      this.institutionId,
      this.branchId
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
        // this.fetchInstitutions();
      }
    });
  }
}
