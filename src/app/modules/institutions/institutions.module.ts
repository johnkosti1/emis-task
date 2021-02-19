import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../core/material/material.module';
import {BranchesComponent} from './components/branches/branches.component';
import {InstitutionsComponent} from './components/institutions/institutions.component';
import {StaffComponent} from './components/staff/staff.component';
import {CreateInstitutionDialogComponent} from './components/institutions/dialogs/create-institution-dialog/create-institution-dialog.component';
import {CreateEditBranchDialogComponent} from './components/branches/dialogs/create-edit-branch-dialog/create-edit-branch-dialog.component';
import {CreateEditStaffDialogComponent} from './components/staff/dialogs/create-edit-staff-dialog/create-edit-staff-dialog.component';
import {InstitutionsRoutingModule} from "./institutions-routing.module";

@NgModule({
  declarations: [
    BranchesComponent,
    InstitutionsComponent,
    StaffComponent,
    CreateInstitutionDialogComponent,
    CreateEditBranchDialogComponent,
    CreateEditStaffDialogComponent,
  ],
  imports: [
    CommonModule,
    InstitutionsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class InstitutionsModule {}
