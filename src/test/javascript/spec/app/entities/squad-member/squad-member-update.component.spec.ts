import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { UnblockItTestModule } from '../../../test.module';
import { SquadMemberUpdateComponent } from 'app/entities/squad-member/squad-member-update.component';
import { SquadMemberService } from 'app/entities/squad-member/squad-member.service';
import { SquadMember } from 'app/shared/model/squad-member.model';

describe('Component Tests', () => {
  describe('SquadMember Management Update Component', () => {
    let comp: SquadMemberUpdateComponent;
    let fixture: ComponentFixture<SquadMemberUpdateComponent>;
    let service: SquadMemberService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UnblockItTestModule],
        declarations: [SquadMemberUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SquadMemberUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SquadMemberUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SquadMemberService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SquadMember(123);
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
        const entity = new SquadMember();
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
