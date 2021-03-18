import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { PraticaComponent } from './pratica.component';
import { PraticaDetailComponent } from './pratica-detail.component';
import { PraticaUpdateComponent } from './pratica-update.component';
import { PraticaDeleteDialogComponent } from './pratica-delete-dialog.component';
import { praticaRoute } from './pratica.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(praticaRoute)],
  declarations: [PraticaComponent, PraticaDetailComponent, PraticaUpdateComponent, PraticaDeleteDialogComponent],
  entryComponents: [PraticaDeleteDialogComponent],
})
export class UnblockItPraticaModule {}
