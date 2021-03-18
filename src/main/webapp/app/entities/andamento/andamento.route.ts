import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAndamento, Andamento } from 'app/shared/model/andamento.model';
import { AndamentoService } from './andamento.service';
import { AndamentoComponent } from './andamento.component';
import { AndamentoDetailComponent } from './andamento-detail.component';
import { AndamentoUpdateComponent } from './andamento-update.component';

@Injectable({ providedIn: 'root' })
export class AndamentoResolve implements Resolve<IAndamento> {
  constructor(private service: AndamentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAndamento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((andamento: HttpResponse<Andamento>) => {
          if (andamento.body) {
            return of(andamento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Andamento());
  }
}

export const andamentoRoute: Routes = [
  {
    path: '',
    component: AndamentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.andamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AndamentoDetailComponent,
    resolve: {
      andamento: AndamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.andamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AndamentoUpdateComponent,
    resolve: {
      andamento: AndamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.andamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AndamentoUpdateComponent,
    resolve: {
      andamento: AndamentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.andamento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
