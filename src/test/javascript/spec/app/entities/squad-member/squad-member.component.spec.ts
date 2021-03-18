import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UnblockItTestModule } from '../../../test.module';
import { SquadMemberComponent } from 'app/entities/squad-member/squad-member.component';
import { SquadMemberService } from 'app/entities/squad-member/squad-member.service';
import { SquadMember } from 'app/shared/model/squad-member.model';

describe('Component Tests', () => {
  describe('SquadMember Management Component', () => {
    let comp: SquadMemberComponent;
    let fixture: ComponentFixture<SquadMemberComponent>;
    let service: SquadMemberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [SquadMemberComponent],
      })
        .overrideTemplate(SquadMemberComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SquadMemberComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SquadMemberService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SquadMember(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.squadMembers && comp.squadMembers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
