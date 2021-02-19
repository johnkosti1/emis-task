import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';
import { BranchesComponent } from './components/branches/branches.component';
import { StaffComponent } from './components/staff/staff.component';
import { AuthResolver } from '../../shared/resolvers/auth.resolver';

const routes: Routes = [
  {
    path: '',
    component: CompaniesComponent,
    children: [
      {
        path: '',
        component: InstitutionsComponent,
        resolve: [AuthResolver],
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
