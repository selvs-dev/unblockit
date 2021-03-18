import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { SquadComponent } from './squad.component';
import { SquadDetailComponent } from './squad-detail.component';
import { SquadUpdateComponent } from './squad-update.component';
import { SquadDeleteDialogComponent } from './squad-delete-dialog.component';
import { squadRoute } from './squad.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(squadRoute)],
  declarations: [SquadComponent, SquadDetailComponent, SquadUpdateComponent, SquadDeleteDialogComponent],
  entryComponents: [SquadDeleteDialogComponent],
})
export class UnblockItSquadModule {}
