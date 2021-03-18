import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { CasoSucessoComponent } from 'app/entities/caso-sucesso/caso-sucesso.component';
import { CasoSucessoService } from 'app/entities/caso-sucesso/caso-sucesso.service';
import { CasoSucesso } from 'app/shared/model/caso-sucesso.model';

describe('Component Tests', () => {
  describe('CasoSucesso Management Component', () => {
    let comp: CasoSucessoComponent;
    let fixture: ComponentFixture<CasoSucessoComponent>;
    let service: CasoSucessoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [CasoSucessoComponent],
      })
        .overrideTemplate(CasoSucessoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CasoSucessoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CasoSucessoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CasoSucesso(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.casoSucessos && comp.casoSucessos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
