import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICasoSucesso } from 'app/shared/model/caso-sucesso.model';
import { CasoSucessoService } from './caso-sucesso.service';

@Component({
  templateUrl: './caso-sucesso-delete-dialog.component.html',
})
export class CasoSucessoDeleteDialogComponent {
  casoSucesso?: ICasoSucesso;

  constructor(
    protected casoSucessoService: CasoSucessoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.casoSucessoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('casoSucessoListModification');
      this.activeModal.close();
    });
  }
}
