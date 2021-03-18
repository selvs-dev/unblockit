import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISquadMember } from 'app/shared/model/squad-member.model';
import { SquadMemberService } from './squad-member.service';
import { SquadMemberDeleteDialogComponent } from './squad-member-delete-dialog.component';

@Component({
  selector: 'jhi-squad-member',
  templateUrl: './squad-member.component.html',
})
export class SquadMemberComponent implements OnInit, OnDestroy {
  squadMembers?: ISquadMember[];
  eventSubscriber?: Subscription;

  constructor(
    protected squadMemberService: SquadMemberService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.squadMemberService.query().subscribe((res: HttpResponse<ISquadMember[]>) => (this.squadMembers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSquadMembers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISquadMember): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSquadMembers(): void {
    this.eventSubscriber = this.eventManager.subscribe('squadMemberListModification', () => this.loadAll());
  }

  delete(squadMember: ISquadMember): void {
    const modalRef = this.modalService.open(SquadMemberDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.squadMember = squadMember;
  }
}
