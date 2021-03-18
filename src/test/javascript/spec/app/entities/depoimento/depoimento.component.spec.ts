import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { DepoimentoComponent } from 'app/entities/depoimento/depoimento.component';
import { DepoimentoService } from 'app/entities/depoimento/depoimento.service';
import { Depoimento } from 'app/shared/model/depoimento.model';

describe('Component Tests', () => {
  describe('Depoimento Management Component', () => {
    let comp: DepoimentoComponent;
    let fixture: ComponentFixture<DepoimentoComponent>;
    let service: DepoimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [DepoimentoComponent],
      })
        .overrideTemplate(DepoimentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepoimentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepoimentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Depoimento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.depoimentos && comp.depoimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
