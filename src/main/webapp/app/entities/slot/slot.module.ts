import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { SlotComponent } from './slot.component';
import { SlotDetailComponent } from './slot-detail.component';
import { SlotUpdateComponent } from './slot-update.component';
import { SlotDeleteDialogComponent } from './slot-delete-dialog.component';
import { slotRoute } from './slot.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(slotRoute)],
  declarations: [SlotComponent, SlotDetailComponent, SlotUpdateComponent, SlotDeleteDialogComponent],
  entryComponents: [SlotDeleteDialogComponent],
})
export class UnblockItSlotModule {}
