import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ciclo',
        loadChildren: () => import('./ciclo/ciclo.module').then(m => m.UnblockItCicloModule),
      },
      {
        path: 'squad',
        loadChildren: () => import('./squad/squad.module').then(m => m.UnblockItSquadModule),
      },
      {
        path: 'squad-member',
        loadChildren: () => import('./squad-member/squad-member.module').then(m => m.UnblockItSquadMemberModule),
      },
      {
        path: 'slot',
        loadChildren: () => import('./slot/slot.module').then(m => m.UnblockItSlotModule),
      },
      {
        path: 'capability',
        loadChildren: () => import('./capability/capability.module').then(m => m.UnblockItCapabilityModule),
      },
      {
        path: 'conteudo',
        loadChildren: () => import('./conteudo/conteudo.module').then(m => m.UnblockItConteudoModule),
      },
      {
        path: 'pratica',
        loadChildren: () => import('./pratica/pratica.module').then(m => m.UnblockItPraticaModule),
      },
      {
        path: 'spec',
        loadChildren: () => import('./spec/spec.module').then(m => m.UnblockItSpecModule),
      },
      {
        path: 'caso-sucesso',
        loadChildren: () => import('./caso-sucesso/caso-sucesso.module').then(m => m.UnblockItCasoSucessoModule),
      },
      {
        path: 'depoimento',
        loadChildren: () => import('./depoimento/depoimento.module').then(m => m.UnblockItDepoimentoModule),
      },
      {
        path: 'feedback',
        loadChildren: () => import('./feedback/feedback.module').then(m => m.UnblockItFeedbackModule),
      },
      {
        path: 'tarefa',
        loadChildren: () => import('./tarefa/tarefa.module').then(m => m.UnblockItTarefaModule),
      },
      {
        path: 'andamento',
        loadChildren: () => import('./andamento/andamento.module').then(m => m.UnblockItAndamentoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class UnblockItEntityModule {}
