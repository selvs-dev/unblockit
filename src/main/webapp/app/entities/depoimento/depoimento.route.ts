import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepoimento, Depoimento } from 'app/shared/model/depoimento.model';
import { DepoimentoService } from './depoimento.service';
import { DepoimentoComponent } from './depoimento.component';
import { DepoimentoDetailComponent } from './depoimento-detail.component';
import { DepoimentoUpdateComponent } from './depoimento-update.component';

@Injectable({ providedIn: 'root' })
export class DepoimentoResolve implements Resolve<IDepoimento> {
  constructor(private service: DepoimentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepoimento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((depoimento: HttpResponse<Depoimento>) => {
          if (depoimento.body) {
            return of(depoimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Depoimento());
  }
}

export const depoimentoRoute: Routes = [
  {
    path: '',
    component: DepoimentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.depoimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DepoimentoDetailComponent,
    resolve: {
      depoimento: DepoimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.depoimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DepoimentoUpdateComponent,
    resolve: {
      depoimento: DepoimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.depoimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DepoimentoUpdateComponent,
    resolve: {
      depoimento: DepoimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.depoimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
