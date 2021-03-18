import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { AndamentoUpdateComponent } from 'app/entities/andamento/andamento-update.component';
import { AndamentoService } from 'app/entities/andamento/andamento.service';
import { Andamento } from 'app/shared/model/andamento.model';

describe('Component Tests', () => {
  describe('Andamento Management Update Component', () => {
    let comp: AndamentoUpdateComponent;
    let fixture: ComponentFixture<AndamentoUpdateComponent>;
    let service: AndamentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [AndamentoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AndamentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AndamentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AndamentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Andamento(123);
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
        const entity = new Andamento();
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
