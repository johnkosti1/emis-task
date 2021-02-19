import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.checkLogin().pipe(map((res) => res));
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    return this.canActivate(route, state);
  }
  checkLogin() {
    return this.authService.isLoggedIn.pipe(
      tap((isLoggedIn) => {
        if (isLoggedIn) {
          return;
        }
        this.router.navigate(['/login']);
      })
    );
  }
}
