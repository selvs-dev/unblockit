import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { PraticaComponent } from 'app/entities/pratica/pratica.component';
import { PraticaService } from 'app/entities/pratica/pratica.service';
import { Pratica } from 'app/shared/model/pratica.model';

describe('Component Tests', () => {
  describe('Pratica Management Component', () => {
    let comp: PraticaComponent;
    let fixture: ComponentFixture<PraticaComponent>;
    let service: PraticaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [PraticaComponent],
      })
        .overrideTemplate(PraticaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PraticaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PraticaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Pratica(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.praticas && comp.praticas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
