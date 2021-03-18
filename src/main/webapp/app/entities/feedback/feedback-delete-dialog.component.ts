import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFeedback } from 'app/shared/model/feedback.model';
import { FeedbackService } from './feedback.service';

@Component({
  templateUrl: './feedback-delete-dialog.component.html',
})
export class FeedbackDeleteDialogComponent {
  feedback?: IFeedback;

  constructor(protected feedbackService: FeedbackService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.feedbackService.delete(id).subscribe(() => {
      this.eventManager.broadcast('feedbackListModification');
      this.activeModal.close();
    });
  }
}
