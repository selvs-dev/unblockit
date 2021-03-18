import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFeedback } from 'app/shared/model/feedback.model';
import { FeedbackService } from './feedback.service';
import { FeedbackDeleteDialogComponent } from './feedback-delete-dialog.component';

@Component({
  selector: 'jhi-feedback',
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit, OnDestroy {
  feedbacks?: IFeedback[];
  eventSubscriber?: Subscription;

  constructor(protected feedbackService: FeedbackService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.feedbackService.query().subscribe((res: HttpResponse<IFeedback[]>) => (this.feedbacks = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFeedbacks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFeedback): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFeedbacks(): void {
    this.eventSubscriber = this.eventManager.subscribe('feedbackListModification', () => this.loadAll());
  }

  delete(feedback: IFeedback): void {
    const modalRef = this.modalService.open(FeedbackDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.feedback = feedback;
  }
}
