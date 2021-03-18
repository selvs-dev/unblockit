import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICasoSucesso } from 'app/shared/model/caso-sucesso.model';

@Component({
  selector: 'jhi-caso-sucesso-detail',
  templateUrl: './caso-sucesso-detail.component.html',
})
export class CasoSucessoDetailComponent implements OnInit {
  casoSucesso: ICasoSucesso | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ casoSucesso }) => (this.casoSucesso = casoSucesso));
  }

  previousState(): void {
    window.history.back();
  }
}
