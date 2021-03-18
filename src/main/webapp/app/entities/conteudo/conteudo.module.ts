import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnblockItSharedModule } from 'app/shared/shared.module';
import { ConteudoComponent } from './conteudo.component';
import { ConteudoDetailComponent } from './conteudo-detail.component';
import { ConteudoUpdateComponent } from './conteudo-update.component';
import { ConteudoDeleteDialogComponent } from './conteudo-delete-dialog.component';
import { conteudoRoute } from './conteudo.route';

@NgModule({
  imports: [UnblockItSharedModule, RouterModule.forChild(conteudoRoute)],
  declarations: [ConteudoComponent, ConteudoDetailComponent, ConteudoUpdateComponent, ConteudoDeleteDialogComponent],
  entryComponents: [ConteudoDeleteDialogComponent],
})
export class UnblockItConteudoModule {}
