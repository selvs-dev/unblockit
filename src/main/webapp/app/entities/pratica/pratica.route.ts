import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPratica, Pratica } from 'app/shared/model/pratica.model';
import { PraticaService } from './pratica.service';
import { PraticaComponent } from './pratica.component';
import { PraticaDetailComponent } from './pratica-detail.component';
import { PraticaUpdateComponent } from './pratica-update.component';

@Injectable({ providedIn: 'root' })
export class PraticaResolve implements Resolve<IPratica> {
  constructor(private service: PraticaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPratica> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pratica: HttpResponse<Pratica>) => {
          if (pratica.body) {
            return of(pratica.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pratica());
  }
}

export const praticaRoute: Routes = [
  {
    path: '',
    component: PraticaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.pratica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PraticaDetailComponent,
    resolve: {
      pratica: PraticaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.pratica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PraticaUpdateComponent,
    resolve: {
      pratica: PraticaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.pratica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PraticaUpdateComponent,
    resolve: {
      pratica: PraticaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.pratica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
