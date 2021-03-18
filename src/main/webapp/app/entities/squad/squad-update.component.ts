import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISquad, Squad } from 'app/shared/model/squad.model';
import { SquadService } from './squad.service';
import { ICiclo } from 'app/shared/model/ciclo.model';
import { CicloService } from 'app/entities/ciclo/ciclo.service';

@Component({
  selector: 'jhi-squad-update',
  templateUrl: './squad-update.component.html',
})
export class SquadUpdateComponent implements OnInit {
  isSaving = false;
  ciclos: ICiclo[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    comunidade: [],
    obs: [],
    cicloSquad: [],
  });

  constructor(
    protected squadService: SquadService,
    protected cicloService: CicloService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ squad }) => {
      this.updateForm(squad);

      this.cicloService.query().subscribe((res: HttpResponse<ICiclo[]>) => (this.ciclos = res.body || []));
    });
  }

  updateForm(squad: ISquad): void {
    this.editForm.patchValue({
      id: squad.id,
      nome: squad.nome,
      comunidade: squad.comunidade,
      obs: squad.obs,
      cicloSquad: squad.cicloSquad,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const squad = this.createFromForm();
    if (squad.id !== undefined) {
      this.subscribeToSaveResponse(this.squadService.update(squad));
    } else {
      this.subscribeToSaveResponse(this.squadService.create(squad));
    }
  }

  private createFromForm(): ISquad {
    return {
      ...new Squad(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      comunidade: this.editForm.get(['comunidade'])!.value,
      obs: this.editForm.get(['obs'])!.value,
      cicloSquad: this.editForm.get(['cicloSquad'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISquad>>): void {
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

  trackById(index: number, item: ICiclo): any {
    return item.id;
  }
}
