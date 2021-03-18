import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISquadMember } from 'app/shared/model/squad-member.model';

@Component({
  selector: 'jhi-squad-member-detail',
  templateUrl: './squad-member-detail.component.html',
})
export class SquadMemberDetailComponent implements OnInit {
  squadMember: ISquadMember | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ squadMember }) => (this.squadMember = squadMember));
  }

  previousState(): void {
    window.history.back();
  }
}
