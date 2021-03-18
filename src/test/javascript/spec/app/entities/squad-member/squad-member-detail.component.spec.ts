import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { SquadMemberDetailComponent } from 'app/entities/squad-member/squad-member-detail.component';
import { SquadMember } from 'app/shared/model/squad-member.model';

describe('Component Tests', () => {
  describe('SquadMember Management Detail Component', () => {
    let comp: SquadMemberDetailComponent;
    let fixture: ComponentFixture<SquadMemberDetailComponent>;
    const route = ({ data: of({ squadMember: new SquadMember(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [SquadMemberDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SquadMemberDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SquadMemberDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load squadMember on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.squadMember).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
