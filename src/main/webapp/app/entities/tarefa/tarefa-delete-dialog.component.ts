import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITarefa } from 'app/shared/model/tarefa.model';
import { TarefaService } from './tarefa.service';

@Component({
  templateUrl: './tarefa-delete-dialog.component.html',
})
export class TarefaDeleteDialogComponent {
  tarefa?: ITarefa;

  constructor(protected tarefaService: TarefaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tarefaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tarefaListModification');
      this.activeModal.close();
    });
  }
}
