import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISlot } from 'app/shared/model/slot.model';

@Component({
  selector: 'jhi-slot-detail',
  templateUrl: './slot-detail.component.html',
})
export class SlotDetailComponent implements OnInit {
  slot: ISlot | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ slot }) => (this.slot = slot));
  }

  previousState(): void {
    window.history.back();
  }
}
