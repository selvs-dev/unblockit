import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITarefa } from 'app/shared/model/tarefa.model';
import { TarefaService } from './tarefa.service';
import { TarefaDeleteDialogComponent } from './tarefa-delete-dialog.component';

@Component({
  selector: 'jhi-tarefa',
  templateUrl: './tarefa.component.html',
})
export class TarefaComponent implements OnInit, OnDestroy {
  tarefas?: ITarefa[];
  eventSubscriber?: Subscription;

  constructor(protected tarefaService: TarefaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tarefaService.query().subscribe((res: HttpResponse<ITarefa[]>) => (this.tarefas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTarefas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITarefa): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTarefas(): void {
    this.eventSubscriber = this.eventManager.subscribe('tarefaListModification', () => this.loadAll());
  }

  delete(tarefa: ITarefa): void {
    const modalRef = this.modalService.open(TarefaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tarefa = tarefa;
  }
}
