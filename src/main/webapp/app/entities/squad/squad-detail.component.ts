import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISquad } from 'app/shared/model/squad.model';

@Component({
  selector: 'jhi-squad-detail',
  templateUrl: './squad-detail.component.html',
})
export class SquadDetailComponent implements OnInit {
  squad: ISquad | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ squad }) => (this.squad = squad));
  }

  previousState(): void {
    window.history.back();
  }
}
