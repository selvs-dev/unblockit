import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { AndamentoDetailComponent } from 'app/entities/andamento/andamento-detail.component';
import { Andamento } from 'app/shared/model/andamento.model';

describe('Component Tests', () => {
  describe('Andamento Management Detail Component', () => {
    let comp: AndamentoDetailComponent;
    let fixture: ComponentFixture<AndamentoDetailComponent>;
    const route = ({ data: of({ andamento: new Andamento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [AndamentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AndamentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AndamentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load andamento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.andamento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
