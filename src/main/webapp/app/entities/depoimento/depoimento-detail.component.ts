import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepoimento } from 'app/shared/model/depoimento.model';

@Component({
  selector: 'jhi-depoimento-detail',
  templateUrl: './depoimento-detail.component.html',
})
export class DepoimentoDetailComponent implements OnInit {
  depoimento: IDepoimento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ depoimento }) => (this.depoimento = depoimento));
  }

  previousState(): void {
    window.history.back();
  }
}
