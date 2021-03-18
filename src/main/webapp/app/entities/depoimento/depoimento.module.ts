import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { DepoimentoComponent } from './depoimento.component';
import { DepoimentoDetailComponent } from './depoimento-detail.component';
import { DepoimentoUpdateComponent } from './depoimento-update.component';
import { DepoimentoDeleteDialogComponent } from './depoimento-delete-dialog.component';
import { depoimentoRoute } from './depoimento.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(depoimentoRoute)],
  declarations: [DepoimentoComponent, DepoimentoDetailComponent, DepoimentoUpdateComponent, DepoimentoDeleteDialogComponent],
  entryComponents: [DepoimentoDeleteDialogComponent],
})
export class UnblockItDepoimentoModule {}
