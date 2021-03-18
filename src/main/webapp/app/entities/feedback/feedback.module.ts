import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { FeedbackComponent } from './feedback.component';
import { FeedbackDetailComponent } from './feedback-detail.component';
import { FeedbackUpdateComponent } from './feedback-update.component';
import { FeedbackDeleteDialogComponent } from './feedback-delete-dialog.component';
import { feedbackRoute } from './feedback.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(feedbackRoute)],
  declarations: [FeedbackComponent, FeedbackDetailComponent, FeedbackUpdateComponent, FeedbackDeleteDialogComponent],
  entryComponents: [FeedbackDeleteDialogComponent],
})
export class UnblockItFeedbackModule {}
