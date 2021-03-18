import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { DepoimentoUpdateComponent } from 'app/entities/depoimento/depoimento-update.component';
import { DepoimentoService } from 'app/entities/depoimento/depoimento.service';
import { Depoimento } from 'app/shared/model/depoimento.model';

describe('Component Tests', () => {
  describe('Depoimento Management Update Component', () => {
    let comp: DepoimentoUpdateComponent;
    let fixture: ComponentFixture<DepoimentoUpdateComponent>;
    let service: DepoimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [DepoimentoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DepoimentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepoimentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepoimentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Depoimento(123);
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
        const entity = new Depoimento();
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
