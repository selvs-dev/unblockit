import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConteudo } from 'app/shared/model/conteudo.model';

@Component({
  selector: 'jhi-conteudo-detail',
  templateUrl: './conteudo-detail.component.html',
})
export class ConteudoDetailComponent implements OnInit {
  conteudo: IConteudo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conteudo }) => (this.conteudo = conteudo));
  }

  previousState(): void {
    window.history.back();
  }
}
