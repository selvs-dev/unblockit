import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { ConteudoUpdateComponent } from 'app/entities/conteudo/conteudo-update.component';
import { ConteudoService } from 'app/entities/conteudo/conteudo.service';
import { Conteudo } from 'app/shared/model/conteudo.model';

describe('Component Tests', () => {
  describe('Conteudo Management Update Component', () => {
    let comp: ConteudoUpdateComponent;
    let fixture: ComponentFixture<ConteudoUpdateComponent>;
    let service: ConteudoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [ConteudoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ConteudoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConteudoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConteudoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Conteudo(123);
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
        const entity = new Conteudo();
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
