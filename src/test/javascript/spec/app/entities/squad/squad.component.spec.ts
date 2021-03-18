import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { SquadComponent } from 'app/entities/squad/squad.component';
import { SquadService } from 'app/entities/squad/squad.service';
import { Squad } from 'app/shared/model/squad.model';

describe('Component Tests', () => {
  describe('Squad Management Component', () => {
    let comp: SquadComponent;
    let fixture: ComponentFixture<SquadComponent>;
    let service: SquadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [SquadComponent],
      })
        .overrideTemplate(SquadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SquadComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SquadService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Squad(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.squads && comp.squads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
