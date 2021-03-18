import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConteudo, Conteudo } from 'app/shared/model/conteudo.model';
import { ConteudoService } from './conteudo.service';
import { ConteudoComponent } from './conteudo.component';
import { ConteudoDetailComponent } from './conteudo-detail.component';
import { ConteudoUpdateComponent } from './conteudo-update.component';

@Injectable({ providedIn: 'root' })
export class ConteudoResolve implements Resolve<IConteudo> {
  constructor(private service: ConteudoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConteudo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((conteudo: HttpResponse<Conteudo>) => {
          if (conteudo.body) {
            return of(conteudo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Conteudo());
  }
}

export const conteudoRoute: Routes = [
  {
    path: '',
    component: ConteudoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.conteudo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConteudoDetailComponent,
    resolve: {
      conteudo: ConteudoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.conteudo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConteudoUpdateComponent,
    resolve: {
      conteudo: ConteudoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.conteudo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConteudoUpdateComponent,
    resolve: {
      conteudo: ConteudoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.conteudo.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
