import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICiclo, Ciclo } from 'app/shared/model/ciclo.model';
import { CicloService } from './ciclo.service';

@Component({
  selector: 'jhi-ciclo-update',
  templateUrl: './ciclo-update.component.html',
})
export class CicloUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [],
  });

  constructor(protected cicloService: CicloService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ciclo }) => {
      this.updateForm(ciclo);
    });
  }

  updateForm(ciclo: ICiclo): void {
    this.editForm.patchValue({
      id: ciclo.id,
      nome: ciclo.nome,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ciclo = this.createFromForm();
    if (ciclo.id !== undefined) {
      this.subscribeToSaveResponse(this.cicloService.update(ciclo));
    } else {
      this.subscribeToSaveResponse(this.cicloService.create(ciclo));
    }
  }

  private createFromForm(): ICiclo {
    return {
      ...new Ciclo(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICiclo>>): void {
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
