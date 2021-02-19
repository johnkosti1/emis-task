import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './modules/core/guards/auth.guard';
import {ShellComponent} from "./components/shell/shell.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/institutions',
    pathMatch: 'full',
  },
  {
    path: '',
    // component: EmptyLayoutComponent
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'institutions',
        loadChildren: () =>
          import('./modules/institutions/institutions.module')
            .then((m) => m.InstitutionsModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
