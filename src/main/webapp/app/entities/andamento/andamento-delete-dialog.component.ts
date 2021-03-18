import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAndamento } from 'app/shared/model/andamento.model';
import { AndamentoService } from './andamento.service';

@Component({
  templateUrl: './andamento-delete-dialog.component.html',
})
export class AndamentoDeleteDialogComponent {
  andamento?: IAndamento;

  constructor(protected andamentoService: AndamentoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.andamentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('andamentoListModification');
      this.activeModal.close();
    });
  }
}
