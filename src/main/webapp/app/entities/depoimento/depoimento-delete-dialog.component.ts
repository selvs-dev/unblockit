import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepoimento } from 'app/shared/model/depoimento.model';
import { DepoimentoService } from './depoimento.service';

@Component({
  templateUrl: './depoimento-delete-dialog.component.html',
})
export class DepoimentoDeleteDialogComponent {
  depoimento?: IDepoimento;

  constructor(
    protected depoimentoService: DepoimentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.depoimentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('depoimentoListModification');
      this.activeModal.close();
    });
  }
}
