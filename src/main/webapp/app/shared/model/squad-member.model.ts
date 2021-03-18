import { IFeedback } from 'app/shared/model/feedback.model';
import { ISquad } from 'app/shared/model/squad.model';
import { PERFILSQUAD } from 'app/shared/model/enumerations/perfilsquad.model';

export interface ISquadMember {
  id?: number;
  nome?: string;
  perfil?: PERFILSQUAD;
  obs?: string;
  feedbacks?: IFeedback[];
  squadSquadMember?: ISquad;
}

export class SquadMember implements ISquadMember {
  constructor(
    public id?: number,
    public nome?: string,
    public perfil?: PERFILSQUAD,
    public obs?: string,
    public feedbacks?: IFeedback[],
    public squadSquadMember?: ISquad
  ) {}
}
