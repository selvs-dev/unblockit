import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITarefa, Tarefa } from 'app/shared/model/tarefa.model';
import { TarefaService } from './tarefa.service';
import { TarefaComponent } from './tarefa.component';
import { TarefaDetailComponent } from './tarefa-detail.component';
import { TarefaUpdateComponent } from './tarefa-update.component';

@Injectable({ providedIn: 'root' })
export class TarefaResolve implements Resolve<ITarefa> {
  constructor(private service: TarefaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITarefa> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tarefa: HttpResponse<Tarefa>) => {
          if (tarefa.body) {
            return of(tarefa.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tarefa());
  }
}

export const tarefaRoute: Routes = [
  {
    path: '',
    component: TarefaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.tarefa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TarefaDetailComponent,
    resolve: {
      tarefa: TarefaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.tarefa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TarefaUpdateComponent,
    resolve: {
      tarefa: TarefaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.tarefa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TarefaUpdateComponent,
    resolve: {
      tarefa: TarefaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.tarefa.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
