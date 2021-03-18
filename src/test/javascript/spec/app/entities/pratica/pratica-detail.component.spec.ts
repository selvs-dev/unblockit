import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { PraticaDetailComponent } from 'app/entities/pratica/pratica-detail.component';
import { Pratica } from 'app/shared/model/pratica.model';

describe('Component Tests', () => {
  describe('Pratica Management Detail Component', () => {
    let comp: PraticaDetailComponent;
    let fixture: ComponentFixture<PraticaDetailComponent>;
    const route = ({ data: of({ pratica: new Pratica(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [PraticaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PraticaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PraticaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pratica on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pratica).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
