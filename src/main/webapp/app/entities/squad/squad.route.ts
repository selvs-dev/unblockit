import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISquad, Squad } from 'app/shared/model/squad.model';
import { SquadService } from './squad.service';
import { SquadComponent } from './squad.component';
import { SquadDetailComponent } from './squad-detail.component';
import { SquadUpdateComponent } from './squad-update.component';

@Injectable({ providedIn: 'root' })
export class SquadResolve implements Resolve<ISquad> {
  constructor(private service: SquadService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISquad> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((squad: HttpResponse<Squad>) => {
          if (squad.body) {
            return of(squad.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Squad());
  }
}

export const squadRoute: Routes = [
  {
    path: '',
    component: SquadComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.squad.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SquadDetailComponent,
    resolve: {
      squad: SquadResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.squad.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SquadUpdateComponent,
    resolve: {
      squad: SquadResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.squad.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SquadUpdateComponent,
    resolve: {
      squad: SquadResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.squad.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
