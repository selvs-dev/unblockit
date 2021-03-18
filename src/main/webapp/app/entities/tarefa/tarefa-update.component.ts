import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITarefa, Tarefa } from 'app/shared/model/tarefa.model';
import { TarefaService } from './tarefa.service';
import { ISquad } from 'app/shared/model/squad.model';
import { SquadService } from 'app/entities/squad/squad.service';

@Component({
  selector: 'jhi-tarefa-update',
  templateUrl: './tarefa-update.component.html',
})
export class TarefaUpdateComponent implements OnInit {
  isSaving = false;
  squads: ISquad[] = [];
  dataLimiteDp: any;

  editForm = this.fb.group({
    id: [],
    descricao: [],
    dataLimite: [],
    concluida: [],
    squadTarefa: [],
  });

  constructor(
    protected tarefaService: TarefaService,
    protected squadService: SquadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tarefa }) => {
      this.updateForm(tarefa);

      this.squadService.query().subscribe((res: HttpResponse<ISquad[]>) => (this.squads = res.body || []));
    });
  }

  updateForm(tarefa: ITarefa): void {
    this.editForm.patchValue({
      id: tarefa.id,
      descricao: tarefa.descricao,
      dataLimite: tarefa.dataLimite,
      concluida: tarefa.concluida,
      squadTarefa: tarefa.squadTarefa,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tarefa = this.createFromForm();
    if (tarefa.id !== undefined) {
      this.subscribeToSaveResponse(this.tarefaService.update(tarefa));
    } else {
      this.subscribeToSaveResponse(this.tarefaService.create(tarefa));
    }
  }

  private createFromForm(): ITarefa {
    return {
      ...new Tarefa(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      dataLimite: this.editForm.get(['dataLimite'])!.value,
      concluida: this.editForm.get(['concluida'])!.value,
      squadTarefa: this.editForm.get(['squadTarefa'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarefa>>): void {
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
