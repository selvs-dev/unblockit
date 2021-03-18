import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { SquadDetailComponent } from 'app/entities/squad/squad-detail.component';
import { Squad } from 'app/shared/model/squad.model';

describe('Component Tests', () => {
  describe('Squad Management Detail Component', () => {
    let comp: SquadDetailComponent;
    let fixture: ComponentFixture<SquadDetailComponent>;
    const route = ({ data: of({ squad: new Squad(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [SquadDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SquadDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SquadDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load squad on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.squad).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
