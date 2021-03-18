import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFeedback, Feedback } from 'app/shared/model/feedback.model';
import { FeedbackService } from './feedback.service';
import { ISquad } from 'app/shared/model/squad.model';
import { SquadService } from 'app/entities/squad/squad.service';
import { ISquadMember } from 'app/shared/model/squad-member.model';
import { SquadMemberService } from 'app/entities/squad-member/squad-member.service';

type SelectableEntity = ISquad | ISquadMember;

@Component({
  selector: 'jhi-feedback-update',
  templateUrl: './feedback-update.component.html',
})
export class FeedbackUpdateComponent implements OnInit {
  isSaving = false;
  squads: ISquad[] = [];
  squadmembers: ISquadMember[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [],
    acao: [],
    squadFeedback: [],
    squadMemberFeedback: [],
  });

  constructor(
    protected feedbackService: FeedbackService,
    protected squadService: SquadService,
    protected squadMemberService: SquadMemberService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feedback }) => {
      this.updateForm(feedback);

      this.squadService.query().subscribe((res: HttpResponse<ISquad[]>) => (this.squads = res.body || []));

      this.squadMemberService.query().subscribe((res: HttpResponse<ISquadMember[]>) => (this.squadmembers = res.body || []));
    });
  }

  updateForm(feedback: IFeedback): void {
    this.editForm.patchValue({
      id: feedback.id,
      descricao: feedback.descricao,
      acao: feedback.acao,
      squadFeedback: feedback.squadFeedback,
      squadMemberFeedback: feedback.squadMemberFeedback,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const feedback = this.createFromForm();
    if (feedback.id !== undefined) {
      this.subscribeToSaveResponse(this.feedbackService.update(feedback));
    } else {
      this.subscribeToSaveResponse(this.feedbackService.create(feedback));
    }
  }

  private createFromForm(): IFeedback {
    return {
      ...new Feedback(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      acao: this.editForm.get(['acao'])!.value,
      squadFeedback: this.editForm.get(['squadFeedback'])!.value,
      squadMemberFeedback: this.editForm.get(['squadMemberFeedback'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeedback>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
