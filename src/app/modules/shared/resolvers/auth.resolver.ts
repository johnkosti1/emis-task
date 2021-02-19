import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Institution } from '../../member/companies/models/interfaces/institution.interface';
import { InstitutionsService } from '../../member/companies/services/institutions.service';

@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<boolean> {
  constructor(
    private _instService: InstitutionsService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.getinstitutions();
  }
  getinstitutions() {
    return this._instService.getInstitutions(0).pipe(
      map((data: any) => {
        if (data && !data.status) {
          return data;
        } else {
          this.router.navigate(['/login']);
          catchError((err) => throwError(err.json().error));
        }
      }),
      catchError((err) => throwError(err.json().error))
    );
  }
}
