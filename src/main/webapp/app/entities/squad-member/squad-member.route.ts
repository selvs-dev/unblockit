import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISquadMember, SquadMember } from 'app/shared/model/squad-member.model';
import { SquadMemberService } from './squad-member.service';
import { SquadMemberComponent } from './squad-member.component';
import { SquadMemberDetailComponent } from './squad-member-detail.component';
import { SquadMemberUpdateComponent } from './squad-member-update.component';

@Injectable({ providedIn: 'root' })
export class SquadMemberResolve implements Resolve<ISquadMember> {
  constructor(private service: SquadMemberService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISquadMember> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((squadMember: HttpResponse<SquadMember>) => {
          if (squadMember.body) {
            return of(squadMember.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SquadMember());
  }
}

export const squadMemberRoute: Routes = [
  {
    path: '',
    component: SquadMemberComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.squadMember.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SquadMemberDetailComponent,
    resolve: {
      squadMember: SquadMemberResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.squadMember.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SquadMemberUpdateComponent,
    resolve: {
      squadMember: SquadMemberResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.squadMember.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SquadMemberUpdateComponent,
    resolve: {
      squadMember: SquadMemberResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.squadMember.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
