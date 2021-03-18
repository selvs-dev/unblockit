import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPratica } from 'app/shared/model/pratica.model';
import { PraticaService } from './pratica.service';
import { PraticaDeleteDialogComponent } from './pratica-delete-dialog.component';

@Component({
  selector: 'jhi-pratica',
  templateUrl: './pratica.component.html',
})
export class PraticaComponent implements OnInit, OnDestroy {
  praticas?: IPratica[];
  eventSubscriber?: Subscription;

  constructor(protected praticaService: PraticaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.praticaService.query().subscribe((res: HttpResponse<IPratica[]>) => (this.praticas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPraticas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPratica): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPraticas(): void {
    this.eventSubscriber = this.eventManager.subscribe('praticaListModification', () => this.loadAll());
  }

  delete(pratica: IPratica): void {
    const modalRef = this.modalService.open(PraticaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pratica = pratica;
  }
}
