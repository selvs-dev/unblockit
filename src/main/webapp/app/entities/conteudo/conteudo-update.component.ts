import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IConteudo, Conteudo } from 'app/shared/model/conteudo.model';
import { ConteudoService } from './conteudo.service';
import { ISlot } from 'app/shared/model/slot.model';
import { SlotService } from 'app/entities/slot/slot.service';

@Component({
  selector: 'jhi-conteudo-update',
  templateUrl: './conteudo-update.component.html',
})
export class ConteudoUpdateComponent implements OnInit {
  isSaving = false;
  slots: ISlot[] = [];

  editForm = this.fb.group({
    id: [],
    tipo: [],
    obs: [],
    confirmado: [],
    slotConteudo: [],
  });

  constructor(
    protected conteudoService: ConteudoService,
    protected slotService: SlotService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conteudo }) => {
      this.updateForm(conteudo);

      this.slotService.query().subscribe((res: HttpResponse<ISlot[]>) => (this.slots = res.body || []));
    });
  }

  updateForm(conteudo: IConteudo): void {
    this.editForm.patchValue({
      id: conteudo.id,
      tipo: conteudo.tipo,
      obs: conteudo.obs,
      confirmado: conteudo.confirmado,
      slotConteudo: conteudo.slotConteudo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const conteudo = this.createFromForm();
    if (conteudo.id !== undefined) {
      this.subscribeToSaveResponse(this.conteudoService.update(conteudo));
    } else {
      this.subscribeToSaveResponse(this.conteudoService.create(conteudo));
    }
  }

  private createFromForm(): IConteudo {
    return {
      ...new Conteudo(),
      id: this.editForm.get(['id'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      obs: this.editForm.get(['obs'])!.value,
      confirmado: this.editForm.get(['confirmado'])!.value,
      slotConteudo: this.editForm.get(['slotConteudo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConteudo>>): void {
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

  trackById(index: number, item: ISlot): any {
    return item.id;
  }
}
