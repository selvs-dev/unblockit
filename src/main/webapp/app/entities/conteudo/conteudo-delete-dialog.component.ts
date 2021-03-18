import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConteudo } from 'app/shared/model/conteudo.model';
import { ConteudoService } from './conteudo.service';

@Component({
  templateUrl: './conteudo-delete-dialog.component.html',
})
export class ConteudoDeleteDialogComponent {
  conteudo?: IConteudo;

  constructor(protected conteudoService: ConteudoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.conteudoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('conteudoListModification');
      this.activeModal.close();
    });
  }
}
