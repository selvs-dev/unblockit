import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISlot, Slot } from 'app/shared/model/slot.model';
import { SlotService } from './slot.service';
import { SlotComponent } from './slot.component';
import { SlotDetailComponent } from './slot-detail.component';
import { SlotUpdateComponent } from './slot-update.component';

@Injectable({ providedIn: 'root' })
export class SlotResolve implements Resolve<ISlot> {
  constructor(private service: SlotService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISlot> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((slot: HttpResponse<Slot>) => {
          if (slot.body) {
            return of(slot.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Slot());
  }
}

export const slotRoute: Routes = [
  {
    path: '',
    component: SlotComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.slot.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SlotDetailComponent,
    resolve: {
      slot: SlotResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.slot.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SlotUpdateComponent,
    resolve: {
      slot: SlotResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.slot.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SlotUpdateComponent,
    resolve: {
      slot: SlotResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.slot.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
