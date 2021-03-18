import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISlot } from 'app/shared/model/slot.model';
import { SlotService } from './slot.service';
import { SlotDeleteDialogComponent } from './slot-delete-dialog.component';

@Component({
  selector: 'jhi-slot',
  templateUrl: './slot.component.html',
})
export class SlotComponent implements OnInit, OnDestroy {
  slots?: ISlot[];
  eventSubscriber?: Subscription;

  constructor(protected slotService: SlotService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.slotService.query().subscribe((res: HttpResponse<ISlot[]>) => (this.slots = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSlots();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISlot): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSlots(): void {
    this.eventSubscriber = this.eventManager.subscribe('slotListModification', () => this.loadAll());
  }

  delete(slot: ISlot): void {
    const modalRef = this.modalService.open(SlotDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.slot = slot;
  }
}
