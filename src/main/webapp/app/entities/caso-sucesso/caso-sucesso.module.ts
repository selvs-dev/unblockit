import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { CasoSucessoComponent } from './caso-sucesso.component';
import { CasoSucessoDetailComponent } from './caso-sucesso-detail.component';
import { CasoSucessoUpdateComponent } from './caso-sucesso-update.component';
import { CasoSucessoDeleteDialogComponent } from './caso-sucesso-delete-dialog.component';
import { casoSucessoRoute } from './caso-sucesso.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(casoSucessoRoute)],
  declarations: [CasoSucessoComponent, CasoSucessoDetailComponent, CasoSucessoUpdateComponent, CasoSucessoDeleteDialogComponent],
  entryComponents: [CasoSucessoDeleteDialogComponent],
})
export class UnblockItCasoSucessoModule {}
