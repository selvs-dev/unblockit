import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { CasoSucessoUpdateComponent } from 'app/entities/caso-sucesso/caso-sucesso-update.component';
import { CasoSucessoService } from 'app/entities/caso-sucesso/caso-sucesso.service';
import { CasoSucesso } from 'app/shared/model/caso-sucesso.model';

describe('Component Tests', () => {
  describe('CasoSucesso Management Update Component', () => {
    let comp: CasoSucessoUpdateComponent;
    let fixture: ComponentFixture<CasoSucessoUpdateComponent>;
    let service: CasoSucessoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [CasoSucessoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CasoSucessoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CasoSucessoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CasoSucessoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CasoSucesso(123);
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
        const entity = new CasoSucesso();
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
