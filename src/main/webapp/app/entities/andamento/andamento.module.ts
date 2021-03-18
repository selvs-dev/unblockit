import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { AndamentoComponent } from './andamento.component';
import { AndamentoDetailComponent } from './andamento-detail.component';
import { AndamentoUpdateComponent } from './andamento-update.component';
import { AndamentoDeleteDialogComponent } from './andamento-delete-dialog.component';
import { andamentoRoute } from './andamento.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(andamentoRoute)],
  declarations: [AndamentoComponent, AndamentoDetailComponent, AndamentoUpdateComponent, AndamentoDeleteDialogComponent],
  entryComponents: [AndamentoDeleteDialogComponent],
})
export class UnblockItAndamentoModule {}
