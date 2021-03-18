import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { CicloComponent } from './ciclo.component';
import { CicloDetailComponent } from './ciclo-detail.component';
import { CicloUpdateComponent } from './ciclo-update.component';
import { CicloDeleteDialogComponent } from './ciclo-delete-dialog.component';
import { cicloRoute } from './ciclo.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(cicloRoute)],
  declarations: [CicloComponent, CicloDetailComponent, CicloUpdateComponent, CicloDeleteDialogComponent],
  entryComponents: [CicloDeleteDialogComponent],
})
export class UnblockItCicloModule {}
