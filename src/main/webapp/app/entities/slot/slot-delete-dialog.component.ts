import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISlot } from 'app/shared/model/slot.model';
import { SlotService } from './slot.service';

@Component({
  templateUrl: './slot-delete-dialog.component.html',
})
export class SlotDeleteDialogComponent {
  slot?: ISlot;

  constructor(protected slotService: SlotService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.slotService.delete(id).subscribe(() => {
      this.eventManager.broadcast('slotListModification');
      this.activeModal.close();
    });
  }
}
