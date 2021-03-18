import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISquad } from 'app/shared/model/squad.model';
import { SquadService } from './squad.service';

@Component({
  templateUrl: './squad-delete-dialog.component.html',
})
export class SquadDeleteDialogComponent {
  squad?: ISquad;

  constructor(protected squadService: SquadService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.squadService.delete(id).subscribe(() => {
      this.eventManager.broadcast('squadListModification');
      this.activeModal.close();
    });
  }
}
