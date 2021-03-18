import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConteudo } from 'app/shared/model/conteudo.model';
import { ConteudoService } from './conteudo.service';
import { ConteudoDeleteDialogComponent } from './conteudo-delete-dialog.component';

@Component({
  selector: 'jhi-conteudo',
  templateUrl: './conteudo.component.html',
})
export class ConteudoComponent implements OnInit, OnDestroy {
  conteudos?: IConteudo[];
  eventSubscriber?: Subscription;

  constructor(protected conteudoService: ConteudoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.conteudoService.query().subscribe((res: HttpResponse<IConteudo[]>) => (this.conteudos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInConteudos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IConteudo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInConteudos(): void {
    this.eventSubscriber = this.eventManager.subscribe('conteudoListModification', () => this.loadAll());
  }

  delete(conteudo: IConteudo): void {
    const modalRef = this.modalService.open(ConteudoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.conteudo = conteudo;
  }
}
