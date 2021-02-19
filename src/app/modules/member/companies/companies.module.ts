import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesComponent } from './companies.component';
import { CompaniesRoutingModule } from './companies-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MaterialModule } from '../../shared/material/material/material.module';
import { BranchesComponent } from './components/branches/branches.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { StaffComponent } from './components/staff/staff.component';
import { CreateInstitutionDialogComponent } from './components/institutions/dialogs/create-institution-dialog/create-institution-dialog.component';
import { CreateEditBranchDialogComponent } from './components/branches/dialogs/create-edit-branch-dialog/create-edit-branch-dialog.component';
import { CreateEditStaffDialogComponent } from './components/staff/dialogs/create-edit-staff-dialog/create-edit-staff-dialog.component';

@NgModule({
  declarations: [
    CompaniesComponent,
    NavigationComponent,
    BranchesComponent,
    InstitutionsComponent,
    StaffComponent,
    CreateInstitutionDialogComponent,
    CreateEditBranchDialogComponent,
    CreateEditStaffDialogComponent,
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CompaniesModule {}
