import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAndamento } from 'app/shared/model/andamento.model';

@Component({
  selector: 'jhi-andamento-detail',
  templateUrl: './andamento-detail.component.html',
})
export class AndamentoDetailComponent implements OnInit {
  andamento: IAndamento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ andamento }) => (this.andamento = andamento));
  }

  previousState(): void {
    window.history.back();
  }
}
