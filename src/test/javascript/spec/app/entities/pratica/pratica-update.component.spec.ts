import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { PraticaUpdateComponent } from 'app/entities/pratica/pratica-update.component';
import { PraticaService } from 'app/entities/pratica/pratica.service';
import { Pratica } from 'app/shared/model/pratica.model';

describe('Component Tests', () => {
  describe('Pratica Management Update Component', () => {
    let comp: PraticaUpdateComponent;
    let fixture: ComponentFixture<PraticaUpdateComponent>;
    let service: PraticaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [PraticaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PraticaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PraticaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PraticaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Pratica(123);
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
        const entity = new Pratica();
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
