import { ICasoSucesso } from 'app/shared/model/caso-sucesso.model';
import { IDepoimento } from 'app/shared/model/depoimento.model';
import { IFeedback } from 'app/shared/model/feedback.model';
import { ITarefa } from 'app/shared/model/tarefa.model';
import { ISquadMember } from 'app/shared/model/squad-member.model';
import { ICiclo } from 'app/shared/model/ciclo.model';

export interface ISquad {
  id?: number;
  nome?: string;
  comunidade?: string;
  obs?: string;
  casoSucessos?: ICasoSucesso[];
  depoimentos?: IDepoimento[];
  feedbacks?: IFeedback[];
  tarefas?: ITarefa[];
  squadMembers?: ISquadMember[];
  cicloSquad?: ICiclo;
}

export class Squad implements ISquad {
  constructor(
    public id?: number,
    public nome?: string,
    public comunidade?: string,
    public obs?: string,
    public casoSucessos?: ICasoSucesso[],
    public depoimentos?: IDepoimento[],
    public feedbacks?: IFeedback[],
    public tarefas?: ITarefa[],
    public squadMembers?: ISquadMember[],
    public cicloSquad?: ICiclo
  ) {}
}
