import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPratica } from 'app/shared/model/pratica.model';

@Component({
  selector: 'jhi-pratica-detail',
  templateUrl: './pratica-detail.component.html',
})
export class PraticaDetailComponent implements OnInit {
  pratica: IPratica | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pratica }) => (this.pratica = pratica));
  }

  previousState(): void {
    window.history.back();
  }
}
