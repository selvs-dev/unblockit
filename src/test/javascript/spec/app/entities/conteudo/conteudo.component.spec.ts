import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { ConteudoComponent } from 'app/entities/conteudo/conteudo.component';
import { ConteudoService } from 'app/entities/conteudo/conteudo.service';
import { Conteudo } from 'app/shared/model/conteudo.model';

describe('Component Tests', () => {
  describe('Conteudo Management Component', () => {
    let comp: ConteudoComponent;
    let fixture: ComponentFixture<ConteudoComponent>;
    let service: ConteudoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [ConteudoComponent],
      })
        .overrideTemplate(ConteudoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConteudoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConteudoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Conteudo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.conteudos && comp.conteudos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
