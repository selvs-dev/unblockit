import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICiclo, Ciclo } from 'app/shared/model/ciclo.model';
import { CicloService } from './ciclo.service';
import { CicloComponent } from './ciclo.component';
import { CicloDetailComponent } from './ciclo-detail.component';
import { CicloUpdateComponent } from './ciclo-update.component';

@Injectable({ providedIn: 'root' })
export class CicloResolve implements Resolve<ICiclo> {
  constructor(private service: CicloService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICiclo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ciclo: HttpResponse<Ciclo>) => {
          if (ciclo.body) {
            return of(ciclo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ciclo());
  }
}

export const cicloRoute: Routes = [
  {
    path: '',
    component: CicloComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.ciclo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CicloDetailComponent,
    resolve: {
      ciclo: CicloResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.ciclo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CicloUpdateComponent,
    resolve: {
      ciclo: CicloResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.ciclo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CicloUpdateComponent,
    resolve: {
      ciclo: CicloResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.ciclo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
