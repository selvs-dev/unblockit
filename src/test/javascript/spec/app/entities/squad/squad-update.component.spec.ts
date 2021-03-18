import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { SquadUpdateComponent } from 'app/entities/squad/squad-update.component';
import { SquadService } from 'app/entities/squad/squad.service';
import { Squad } from 'app/shared/model/squad.model';

describe('Component Tests', () => {
  describe('Squad Management Update Component', () => {
    let comp: SquadUpdateComponent;
    let fixture: ComponentFixture<SquadUpdateComponent>;
    let service: SquadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [SquadUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SquadUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SquadUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SquadService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Squad(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Squad();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
