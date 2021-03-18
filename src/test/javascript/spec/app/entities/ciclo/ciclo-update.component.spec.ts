import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { CicloUpdateComponent } from 'app/entities/ciclo/ciclo-update.component';
import { CicloService } from 'app/entities/ciclo/ciclo.service';
import { Ciclo } from 'app/shared/model/ciclo.model';

describe('Component Tests', () => {
  describe('Ciclo Management Update Component', () => {
    let comp: CicloUpdateComponent;
    let fixture: ComponentFixture<CicloUpdateComponent>;
    let service: CicloService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [CicloUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CicloUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CicloUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CicloService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ciclo(123);
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
        const entity = new Ciclo();
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
