import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/guest/login/login.component';
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { AuthResolver } from './modules/shared/resolvers/auth.resolver';

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
    canActivate: [AuthGuard],
    canActivateChild:[AuthGuard],
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
