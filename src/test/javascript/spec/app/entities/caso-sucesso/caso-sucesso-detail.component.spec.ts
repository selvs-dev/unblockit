import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { CasoSucessoDetailComponent } from 'app/entities/caso-sucesso/caso-sucesso-detail.component';
import { CasoSucesso } from 'app/shared/model/caso-sucesso.model';

describe('Component Tests', () => {
  describe('CasoSucesso Management Detail Component', () => {
    let comp: CasoSucessoDetailComponent;
    let fixture: ComponentFixture<CasoSucessoDetailComponent>;
    const route = ({ data: of({ casoSucesso: new CasoSucesso(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [CasoSucessoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CasoSucessoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CasoSucessoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load casoSucesso on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.casoSucesso).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
