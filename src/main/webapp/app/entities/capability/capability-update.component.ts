import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICapability, Capability } from 'app/shared/model/capability.model';
import { CapabilityService } from './capability.service';

@Component({
  selector: 'jhi-capability-update',
  templateUrl: './capability-update.component.html',
})
export class CapabilityUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
  });

  constructor(protected capabilityService: CapabilityService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ capability }) => {
      this.updateForm(capability);
    });
  }

  updateForm(capability: ICapability): void {
    this.editForm.patchValue({
      id: capability.id,
      nome: capability.nome,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const capability = this.createFromForm();
    if (capability.id !== undefined) {
      this.subscribeToSaveResponse(this.capabilityService.update(capability));
    } else {
      this.subscribeToSaveResponse(this.capabilityService.create(capability));
    }
  }

  private createFromForm(): ICapability {
    return {
      ...new Capability(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICapability>>): void {
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
