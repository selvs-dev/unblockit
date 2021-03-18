import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISquad } from 'app/shared/model/squad.model';
import { SquadService } from './squad.service';
import { SquadDeleteDialogComponent } from './squad-delete-dialog.component';

@Component({
  selector: 'jhi-squad',
  templateUrl: './squad.component.html',
})
export class SquadComponent implements OnInit, OnDestroy {
  squads?: ISquad[];
  eventSubscriber?: Subscription;

  constructor(protected squadService: SquadService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.squadService.query().subscribe((res: HttpResponse<ISquad[]>) => (this.squads = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSquads();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISquad): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSquads(): void {
    this.eventSubscriber = this.eventManager.subscribe('squadListModification', () => this.loadAll());
  }

  delete(squad: ISquad): void {
    const modalRef = this.modalService.open(SquadDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.squad = squad;
  }
}
