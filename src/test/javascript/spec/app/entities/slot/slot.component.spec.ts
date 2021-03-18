import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { SlotComponent } from 'app/entities/slot/slot.component';
import { SlotService } from 'app/entities/slot/slot.service';
import { Slot } from 'app/shared/model/slot.model';

describe('Component Tests', () => {
  describe('Slot Management Component', () => {
    let comp: SlotComponent;
    let fixture: ComponentFixture<SlotComponent>;
    let service: SlotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [SlotComponent],
      })
        .overrideTemplate(SlotComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SlotComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SlotService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Slot(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.slots && comp.slots[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
