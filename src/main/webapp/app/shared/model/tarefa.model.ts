import { Moment } from 'moment';
import { IAndamento } from 'app/shared/model/andamento.model';
import { ISquad } from 'app/shared/model/squad.model';

export interface ITarefa {
  id?: number;
  descricao?: string;
  dataLimite?: Moment;
  concluida?: string;
  andamentos?: IAndamento[];
  squadTarefa?: ISquad;
}

export class Tarefa implements ITarefa {
  constructor(
    public id?: number,
    public descricao?: string,
    public dataLimite?: Moment,
    public concluida?: string,
    public andamentos?: IAndamento[],
    public squadTarefa?: ISquad
  ) {}
}
