import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAndamento } from 'app/shared/model/andamento.model';
import { AndamentoService } from './andamento.service';
import { AndamentoDeleteDialogComponent } from './andamento-delete-dialog.component';

@Component({
  selector: 'jhi-andamento',
  templateUrl: './andamento.component.html',
})
export class AndamentoComponent implements OnInit, OnDestroy {
  andamentos?: IAndamento[];
  eventSubscriber?: Subscription;

  constructor(protected andamentoService: AndamentoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.andamentoService.query().subscribe((res: HttpResponse<IAndamento[]>) => (this.andamentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAndamentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAndamento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAndamentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('andamentoListModification', () => this.loadAll());
  }

  delete(andamento: IAndamento): void {
    const modalRef = this.modalService.open(AndamentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.andamento = andamento;
  }
}
