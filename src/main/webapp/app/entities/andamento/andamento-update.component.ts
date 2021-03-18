import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAndamento, Andamento } from 'app/shared/model/andamento.model';
import { AndamentoService } from './andamento.service';
import { ITarefa } from 'app/shared/model/tarefa.model';
import { TarefaService } from 'app/entities/tarefa/tarefa.service';

@Component({
  selector: 'jhi-andamento-update',
  templateUrl: './andamento-update.component.html',
})
export class AndamentoUpdateComponent implements OnInit {
  isSaving = false;
  tarefas: ITarefa[] = [];
  dataAndamentoDp: any;

  editForm = this.fb.group({
    id: [],
    dataAndamento: [],
    descricao: [],
    tarefaAndamento: [],
  });

  constructor(
    protected andamentoService: AndamentoService,
    protected tarefaService: TarefaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ andamento }) => {
      this.updateForm(andamento);

      this.tarefaService.query().subscribe((res: HttpResponse<ITarefa[]>) => (this.tarefas = res.body || []));
    });
  }

  updateForm(andamento: IAndamento): void {
    this.editForm.patchValue({
      id: andamento.id,
      dataAndamento: andamento.dataAndamento,
      descricao: andamento.descricao,
      tarefaAndamento: andamento.tarefaAndamento,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const andamento = this.createFromForm();
    if (andamento.id !== undefined) {
      this.subscribeToSaveResponse(this.andamentoService.update(andamento));
    } else {
      this.subscribeToSaveResponse(this.andamentoService.create(andamento));
    }
  }

  private createFromForm(): IAndamento {
    return {
      ...new Andamento(),
      id: this.editForm.get(['id'])!.value,
      dataAndamento: this.editForm.get(['dataAndamento'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      tarefaAndamento: this.editForm.get(['tarefaAndamento'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAndamento>>): void {
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

  trackById(index: number, item: ITarefa): any {
    return item.id;
  }
}
