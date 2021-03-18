import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { DepoimentoDetailComponent } from 'app/entities/depoimento/depoimento-detail.component';
import { Depoimento } from 'app/shared/model/depoimento.model';

describe('Component Tests', () => {
  describe('Depoimento Management Detail Component', () => {
    let comp: DepoimentoDetailComponent;
    let fixture: ComponentFixture<DepoimentoDetailComponent>;
    const route = ({ data: of({ depoimento: new Depoimento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [DepoimentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DepoimentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepoimentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load depoimento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.depoimento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
