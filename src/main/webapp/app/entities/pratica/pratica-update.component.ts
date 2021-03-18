import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPratica, Pratica } from 'app/shared/model/pratica.model';
import { PraticaService } from './pratica.service';
import { ICapability } from 'app/shared/model/capability.model';
import { CapabilityService } from 'app/entities/capability/capability.service';

@Component({
  selector: 'jhi-pratica-update',
  templateUrl: './pratica-update.component.html',
})
export class PraticaUpdateComponent implements OnInit {
  isSaving = false;
  capabilities: ICapability[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    capabilityPratica: [],
  });

  constructor(
    protected praticaService: PraticaService,
    protected capabilityService: CapabilityService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pratica }) => {
      this.updateForm(pratica);

      this.capabilityService.query().subscribe((res: HttpResponse<ICapability[]>) => (this.capabilities = res.body || []));
    });
  }

  updateForm(pratica: IPratica): void {
    this.editForm.patchValue({
      id: pratica.id,
      nome: pratica.nome,
      capabilityPratica: pratica.capabilityPratica,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pratica = this.createFromForm();
    if (pratica.id !== undefined) {
      this.subscribeToSaveResponse(this.praticaService.update(pratica));
    } else {
      this.subscribeToSaveResponse(this.praticaService.create(pratica));
    }
  }

  private createFromForm(): IPratica {
    return {
      ...new Pratica(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      capabilityPratica: this.editForm.get(['capabilityPratica'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPratica>>): void {
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

  trackById(index: number, item: ICapability): any {
    return item.id;
  }
}
