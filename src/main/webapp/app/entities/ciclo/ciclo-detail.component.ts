import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICiclo } from 'app/shared/model/ciclo.model';

@Component({
  selector: 'jhi-ciclo-detail',
  templateUrl: './ciclo-detail.component.html',
})
export class CicloDetailComponent implements OnInit {
  ciclo: ICiclo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ciclo }) => (this.ciclo = ciclo));
  }

  previousState(): void {
    window.history.back();
  }
}
