import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISlot, Slot } from 'app/shared/model/slot.model';
import { SlotService } from './slot.service';

@Component({
  selector: 'jhi-slot-update',
  templateUrl: './slot-update.component.html',
})
export class SlotUpdateComponent implements OnInit {
  isSaving = false;
  dataDp: any;

  editForm = this.fb.group({
    id: [],
    data: [],
    obs: [],
    confirmado: [],
  });

  constructor(protected slotService: SlotService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ slot }) => {
      this.updateForm(slot);
    });
  }

  updateForm(slot: ISlot): void {
    this.editForm.patchValue({
      id: slot.id,
      data: slot.data,
      obs: slot.obs,
      confirmado: slot.confirmado,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const slot = this.createFromForm();
    if (slot.id !== undefined) {
      this.subscribeToSaveResponse(this.slotService.update(slot));
    } else {
      this.subscribeToSaveResponse(this.slotService.create(slot));
    }
  }

  private createFromForm(): ISlot {
    return {
      ...new Slot(),
      id: this.editForm.get(['id'])!.value,
      data: this.editForm.get(['data'])!.value,
      obs: this.editForm.get(['obs'])!.value,
      confirmado: this.editForm.get(['confirmado'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISlot>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
