import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICasoSucesso, CasoSucesso } from 'app/shared/model/caso-sucesso.model';
import { CasoSucessoService } from './caso-sucesso.service';
import { CasoSucessoComponent } from './caso-sucesso.component';
import { CasoSucessoDetailComponent } from './caso-sucesso-detail.component';
import { CasoSucessoUpdateComponent } from './caso-sucesso-update.component';

@Injectable({ providedIn: 'root' })
export class CasoSucessoResolve implements Resolve<ICasoSucesso> {
  constructor(private service: CasoSucessoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICasoSucesso> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((casoSucesso: HttpResponse<CasoSucesso>) => {
          if (casoSucesso.body) {
            return of(casoSucesso.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CasoSucesso());
  }
}

export const casoSucessoRoute: Routes = [
  {
    path: '',
    component: CasoSucessoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.casoSucesso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CasoSucessoDetailComponent,
    resolve: {
      casoSucesso: CasoSucessoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.casoSucesso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CasoSucessoUpdateComponent,
    resolve: {
      casoSucesso: CasoSucessoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.casoSucesso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CasoSucessoUpdateComponent,
    resolve: {
      casoSucesso: CasoSucessoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.casoSucesso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
