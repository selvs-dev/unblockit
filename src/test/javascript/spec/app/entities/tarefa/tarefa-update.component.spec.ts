import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { TarefaUpdateComponent } from 'app/entities/tarefa/tarefa-update.component';
import { TarefaService } from 'app/entities/tarefa/tarefa.service';
import { Tarefa } from 'app/shared/model/tarefa.model';

describe('Component Tests', () => {
  describe('Tarefa Management Update Component', () => {
    let comp: TarefaUpdateComponent;
    let fixture: ComponentFixture<TarefaUpdateComponent>;
    let service: TarefaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [TarefaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TarefaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TarefaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TarefaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tarefa(123);
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
        const entity = new Tarefa();
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
