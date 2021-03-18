import { ISquad } from 'app/shared/model/squad.model';
import { ISquadMember } from 'app/shared/model/squad-member.model';

export interface IFeedback {
  id?: number;
  descricao?: string;
  acao?: string;
  squadFeedback?: ISquad;
  squadMemberFeedback?: ISquadMember;
}

export class Feedback implements IFeedback {
  constructor(
    public id?: number,
    public descricao?: string,
    public acao?: string,
    public squadFeedback?: ISquad,
    public squadMemberFeedback?: ISquadMember
  ) {}
}
