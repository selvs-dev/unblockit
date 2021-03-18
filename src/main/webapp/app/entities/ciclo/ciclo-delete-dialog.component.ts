import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICiclo } from 'app/shared/model/ciclo.model';
import { CicloService } from './ciclo.service';

@Component({
  templateUrl: './ciclo-delete-dialog.component.html',
})
export class CicloDeleteDialogComponent {
  ciclo?: ICiclo;

  constructor(protected cicloService: CicloService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cicloService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cicloListModification');
      this.activeModal.close();
    });
  }
}
