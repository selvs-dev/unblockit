import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICiclo } from 'app/shared/model/ciclo.model';
import { CicloService } from './ciclo.service';
import { CicloDeleteDialogComponent } from './ciclo-delete-dialog.component';

@Component({
  selector: 'jhi-ciclo',
  templateUrl: './ciclo.component.html',
})
export class CicloComponent implements OnInit, OnDestroy {
  ciclos?: ICiclo[];
  eventSubscriber?: Subscription;

  constructor(protected cicloService: CicloService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cicloService.query().subscribe((res: HttpResponse<ICiclo[]>) => (this.ciclos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCiclos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICiclo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCiclos(): void {
    this.eventSubscriber = this.eventManager.subscribe('cicloListModification', () => this.loadAll());
  }

  delete(ciclo: ICiclo): void {
    const modalRef = this.modalService.open(CicloDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ciclo = ciclo;
  }
}
