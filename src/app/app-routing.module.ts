import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/guest/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/institutions',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'institutions',
    // canActivate: [PermissionGuard],
    loadChildren: () =>
      import('./modules/member/companies/companies.module').then(
        (m) => m.CompaniesModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
