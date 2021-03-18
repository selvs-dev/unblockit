import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { TarefaDetailComponent } from 'app/entities/tarefa/tarefa-detail.component';
import { Tarefa } from 'app/shared/model/tarefa.model';

describe('Component Tests', () => {
  describe('Tarefa Management Detail Component', () => {
    let comp: TarefaDetailComponent;
    let fixture: ComponentFixture<TarefaDetailComponent>;
    const route = ({ data: of({ tarefa: new Tarefa(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [TarefaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TarefaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TarefaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tarefa on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tarefa).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
