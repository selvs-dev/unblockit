import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICasoSucesso } from 'app/shared/model/caso-sucesso.model';
import { CasoSucessoService } from './caso-sucesso.service';
import { CasoSucessoDeleteDialogComponent } from './caso-sucesso-delete-dialog.component';

@Component({
  selector: 'jhi-caso-sucesso',
  templateUrl: './caso-sucesso.component.html',
})
export class CasoSucessoComponent implements OnInit, OnDestroy {
  casoSucessos?: ICasoSucesso[];
  eventSubscriber?: Subscription;

  constructor(
    protected casoSucessoService: CasoSucessoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.casoSucessoService.query().subscribe((res: HttpResponse<ICasoSucesso[]>) => (this.casoSucessos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCasoSucessos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICasoSucesso): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCasoSucessos(): void {
    this.eventSubscriber = this.eventManager.subscribe('casoSucessoListModification', () => this.loadAll());
  }

  delete(casoSucesso: ICasoSucesso): void {
    const modalRef = this.modalService.open(CasoSucessoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.casoSucesso = casoSucesso;
  }
}
