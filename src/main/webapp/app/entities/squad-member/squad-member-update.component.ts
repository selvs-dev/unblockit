import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISquadMember, SquadMember } from 'app/shared/model/squad-member.model';
import { SquadMemberService } from './squad-member.service';
import { ISquad } from 'app/shared/model/squad.model';
import { SquadService } from 'app/entities/squad/squad.service';

@Component({
  selector: 'jhi-squad-member-update',
  templateUrl: './squad-member-update.component.html',
})
export class SquadMemberUpdateComponent implements OnInit {
  isSaving = false;
  squads: ISquad[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    perfil: [],
    obs: [],
    squadSquadMember: [],
  });

  constructor(
    protected squadMemberService: SquadMemberService,
    protected squadService: SquadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ squadMember }) => {
      this.updateForm(squadMember);

      this.squadService.query().subscribe((res: HttpResponse<ISquad[]>) => (this.squads = res.body || []));
    });
  }

  updateForm(squadMember: ISquadMember): void {
    this.editForm.patchValue({
      id: squadMember.id,
      nome: squadMember.nome,
      perfil: squadMember.perfil,
      obs: squadMember.obs,
      squadSquadMember: squadMember.squadSquadMember,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const squadMember = this.createFromForm();
    if (squadMember.id !== undefined) {
      this.subscribeToSaveResponse(this.squadMemberService.update(squadMember));
    } else {
      this.subscribeToSaveResponse(this.squadMemberService.create(squadMember));
    }
  }

  private createFromForm(): ISquadMember {
    return {
      ...new SquadMember(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      perfil: this.editForm.get(['perfil'])!.value,
      obs: this.editForm.get(['obs'])!.value,
      squadSquadMember: this.editForm.get(['squadSquadMember'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISquadMember>>): void {
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
