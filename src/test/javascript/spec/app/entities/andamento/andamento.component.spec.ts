import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { AndamentoComponent } from 'app/entities/andamento/andamento.component';
import { AndamentoService } from 'app/entities/andamento/andamento.service';
import { Andamento } from 'app/shared/model/andamento.model';

describe('Component Tests', () => {
  describe('Andamento Management Component', () => {
    let comp: AndamentoComponent;
    let fixture: ComponentFixture<AndamentoComponent>;
    let service: AndamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [AndamentoComponent],
      })
        .overrideTemplate(AndamentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AndamentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AndamentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Andamento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.andamentos && comp.andamentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
