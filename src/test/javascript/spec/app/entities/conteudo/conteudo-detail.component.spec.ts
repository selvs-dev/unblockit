import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { ConteudoDetailComponent } from 'app/entities/conteudo/conteudo-detail.component';
import { Conteudo } from 'app/shared/model/conteudo.model';

describe('Component Tests', () => {
  describe('Conteudo Management Detail Component', () => {
    let comp: ConteudoDetailComponent;
    let fixture: ComponentFixture<ConteudoDetailComponent>;
    const route = ({ data: of({ conteudo: new Conteudo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [ConteudoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ConteudoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConteudoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load conteudo on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.conteudo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
