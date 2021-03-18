import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { TarefaComponent } from 'app/entities/tarefa/tarefa.component';
import { TarefaService } from 'app/entities/tarefa/tarefa.service';
import { Tarefa } from 'app/shared/model/tarefa.model';

describe('Component Tests', () => {
  describe('Tarefa Management Component', () => {
    let comp: TarefaComponent;
    let fixture: ComponentFixture<TarefaComponent>;
    let service: TarefaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [TarefaComponent],
      })
        .overrideTemplate(TarefaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TarefaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TarefaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tarefa(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tarefas && comp.tarefas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
