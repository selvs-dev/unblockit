import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISquadMember } from 'app/shared/model/squad-member.model';
import { SquadMemberService } from './squad-member.service';

@Component({
  templateUrl: './squad-member-delete-dialog.component.html',
})
export class SquadMemberDeleteDialogComponent {
  squadMember?: ISquadMember;

  constructor(
    protected squadMemberService: SquadMemberService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.squadMemberService.delete(id).subscribe(() => {
      this.eventManager.broadcast('squadMemberListModification');
      this.activeModal.close();
    });
  }
}
