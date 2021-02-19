import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Branch} from '../../models/interfaces/branch.interface';
import {Institution} from '../../models/interfaces/institution.interface';
import {BranchesService} from '../../services/branches.service';
import {InstitutionsService} from '../../services/institutions.service';
import {CreateEditBranchDialogComponent} from './dialogs/create-edit-branch-dialog/create-edit-branch-dialog.component';
import {filter, finalize, tap} from "rxjs/operators";

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  institutionId: number;
  institution$: Observable<Institution>;
  dataSource: Branch[];
  displayedColumns: string[] = ['address', 'manager_name', 'actions'];
  page: {
    page: number;
    size: number;
    total: number;
  } = {page: 0, size: 10, total: 0};

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _branchService: BranchesService,
    private _institutionService: InstitutionsService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this.institutionId = this._activatedRoute.snapshot.params.institutionId;
    this.institution$ = this._institutionService.getInstitution(this.institutionId);
    this.fetchBranches();
  }

  fetchBranches() {
    this._branchService.getBranches(this.institutionId, this.page.page)
      .pipe(
        tap(({data}) => this.dataSource = data),
        tap(({total}) => this.page.total = total),
      )
      .subscribe();
  }

  createBranchDialog() {
    const dialogRef = this._dialog.open(CreateEditBranchDialogComponent, {
      disableClose: true,
      minWidth: '600px',
      data: {
        institutionId: this.institutionId
      },
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        tap(result => this._snackBar.open(result, null, {
          horizontalPosition: 'left',
          duration: 2000,
          panelClass: 'green-snackbar',
        })),
        tap(() => this.fetchBranches())
      )
      .subscribe();
  }

  editBrancheDialog(e: Event, branch): void {
    e.stopPropagation();
    const dialogRef = this._dialog.open(CreateEditBranchDialogComponent, {
      disableClose: true,
      minWidth: '600px',
      data: {
        institutionId: this.institutionId,
        branch
      },
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => result),
        tap(result => this._snackBar.open(result, null, {
          horizontalPosition: 'left',
          duration: 2000,
          panelClass: 'green-snackbar',
        })),
        tap(() => this.fetchBranches())
      )
      .subscribe();
  }

  navigateToCurrentBranch(branch: Branch) {
    this._router.navigate([
      'institutions',
      this.institutionId,
      'branches',
      branch.id,
      'personal'
    ]);
  }

  pageEvent(e: PageEvent) {
    this.page.page = e.pageIndex;
    this.fetchBranches();
  }
}
