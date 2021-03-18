import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { SquadMemberComponent } from './squad-member.component';
import { SquadMemberDetailComponent } from './squad-member-detail.component';
import { SquadMemberUpdateComponent } from './squad-member-update.component';
import { SquadMemberDeleteDialogComponent } from './squad-member-delete-dialog.component';
import { squadMemberRoute } from './squad-member.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(squadMemberRoute)],
  declarations: [SquadMemberComponent, SquadMemberDetailComponent, SquadMemberUpdateComponent, SquadMemberDeleteDialogComponent],
  entryComponents: [SquadMemberDeleteDialogComponent],
})
export class UnblockItSquadMemberModule {}
