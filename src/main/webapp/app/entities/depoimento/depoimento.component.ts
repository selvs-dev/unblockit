import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepoimento } from 'app/shared/model/depoimento.model';
import { DepoimentoService } from './depoimento.service';
import { DepoimentoDeleteDialogComponent } from './depoimento-delete-dialog.component';

@Component({
  selector: 'jhi-depoimento',
  templateUrl: './depoimento.component.html',
})
export class DepoimentoComponent implements OnInit, OnDestroy {
  depoimentos?: IDepoimento[];
  eventSubscriber?: Subscription;

  constructor(protected depoimentoService: DepoimentoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.depoimentoService.query().subscribe((res: HttpResponse<IDepoimento[]>) => (this.depoimentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepoimentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepoimento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepoimentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('depoimentoListModification', () => this.loadAll());
  }

  delete(depoimento: IDepoimento): void {
    const modalRef = this.modalService.open(DepoimentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.depoimento = depoimento;
  }
}
