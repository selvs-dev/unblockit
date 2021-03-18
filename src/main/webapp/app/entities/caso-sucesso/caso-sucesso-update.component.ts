import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICasoSucesso, CasoSucesso } from 'app/shared/model/caso-sucesso.model';
import { CasoSucessoService } from './caso-sucesso.service';
import { ISquad } from 'app/shared/model/squad.model';
import { SquadService } from 'app/entities/squad/squad.service';

@Component({
  selector: 'jhi-caso-sucesso-update',
  templateUrl: './caso-sucesso-update.component.html',
})
export class CasoSucessoUpdateComponent implements OnInit {
  isSaving = false;
  squads: ISquad[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    confirmado: [],
    squadCasoSucesso: [],
  });

  constructor(
    protected casoSucessoService: CasoSucessoService,
    protected squadService: SquadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ casoSucesso }) => {
      this.updateForm(casoSucesso);

      this.squadService.query().subscribe((res: HttpResponse<ISquad[]>) => (this.squads = res.body || []));
    });
  }

  updateForm(casoSucesso: ICasoSucesso): void {
    this.editForm.patchValue({
      id: casoSucesso.id,
      descricao: casoSucesso.descricao,
      confirmado: casoSucesso.confirmado,
      squadCasoSucesso: casoSucesso.squadCasoSucesso,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const casoSucesso = this.createFromForm();
    if (casoSucesso.id !== undefined) {
      this.subscribeToSaveResponse(this.casoSucessoService.update(casoSucesso));
    } else {
      this.subscribeToSaveResponse(this.casoSucessoService.create(casoSucesso));
    }
  }

  private createFromForm(): ICasoSucesso {
    return {
      ...new CasoSucesso(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      confirmado: this.editForm.get(['confirmado'])!.value,
      squadCasoSucesso: this.editForm.get(['squadCasoSucesso'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICasoSucesso>>): void {
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
