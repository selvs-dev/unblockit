import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITarefa } from 'app/shared/model/tarefa.model';

@Component({
  selector: 'jhi-tarefa-detail',
  templateUrl: './tarefa-detail.component.html',
})
export class TarefaDetailComponent implements OnInit {
  tarefa: ITarefa | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tarefa }) => (this.tarefa = tarefa));
  }

  previousState(): void {
    window.history.back();
  }
}
