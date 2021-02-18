import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { BranchesComponent } from './components/branches/branches.component';
import { StaffComponent } from './components/staff/staff.component';

const routes: Routes = [
  {
    path: '',
    component: CompaniesComponent,
    children: [
      {
        path: '',
        component: InstitutionsComponent,
      },
      {
        path: ':institutionId',
        component: BranchesComponent,
      },
      {
        path: ':institutionId/branches/:branchId/personal',
        component: StaffComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
