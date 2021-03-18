import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFeedback, Feedback } from 'app/shared/model/feedback.model';
import { FeedbackService } from './feedback.service';
import { FeedbackComponent } from './feedback.component';
import { FeedbackDetailComponent } from './feedback-detail.component';
import { FeedbackUpdateComponent } from './feedback-update.component';

@Injectable({ providedIn: 'root' })
export class FeedbackResolve implements Resolve<IFeedback> {
  constructor(private service: FeedbackService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFeedback> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((feedback: HttpResponse<Feedback>) => {
          if (feedback.body) {
            return of(feedback.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Feedback());
  }
}

export const feedbackRoute: Routes = [
  {
    path: '',
    component: FeedbackComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.feedback.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FeedbackDetailComponent,
    resolve: {
      feedback: FeedbackResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.feedback.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FeedbackUpdateComponent,
    resolve: {
      feedback: FeedbackResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.feedback.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FeedbackUpdateComponent,
    resolve: {
      feedback: FeedbackResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'unblockItApp.feedback.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
