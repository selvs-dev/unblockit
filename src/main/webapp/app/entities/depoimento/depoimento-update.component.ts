import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDepoimento, Depoimento } from 'app/shared/model/depoimento.model';
import { DepoimentoService } from './depoimento.service';
import { ISquad } from 'app/shared/model/squad.model';
import { SquadService } from 'app/entities/squad/squad.service';

@Component({
  selector: 'jhi-depoimento-update',
  templateUrl: './depoimento-update.component.html',
})
export class DepoimentoUpdateComponent implements OnInit {
  isSaving = false;
  squads: ISquad[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    confirmado: [],
    squadDepoimento: [],
  });

  constructor(
    protected depoimentoService: DepoimentoService,
    protected squadService: SquadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depoimento }) => {
      this.updateForm(depoimento);

      this.squadService.query().subscribe((res: HttpResponse<ISquad[]>) => (this.squads = res.body || []));
    });
  }

  updateForm(depoimento: IDepoimento): void {
    this.editForm.patchValue({
      id: depoimento.id,
      descricao: depoimento.descricao,
      confirmado: depoimento.confirmado,
      squadDepoimento: depoimento.squadDepoimento,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const depoimento = this.createFromForm();
    if (depoimento.id !== undefined) {
      this.subscribeToSaveResponse(this.depoimentoService.update(depoimento));
    } else {
      this.subscribeToSaveResponse(this.depoimentoService.create(depoimento));
    }
  }

  private createFromForm(): IDepoimento {
    return {
      ...new Depoimento(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      confirmado: this.editForm.get(['confirmado'])!.value,
      squadDepoimento: this.editForm.get(['squadDepoimento'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepoimento>>): void {
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

  trackById(index: number, item: ISquad): any {
    return item.id;
  }
}
