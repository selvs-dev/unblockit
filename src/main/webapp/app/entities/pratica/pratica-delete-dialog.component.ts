import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPratica } from 'app/shared/model/pratica.model';
import { PraticaService } from './pratica.service';

@Component({
  templateUrl: './pratica-delete-dialog.component.html',
})
export class PraticaDeleteDialogComponent {
  pratica?: IPratica;

  constructor(protected praticaService: PraticaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.praticaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('praticaListModification');
      this.activeModal.close();
    });
  }
}
