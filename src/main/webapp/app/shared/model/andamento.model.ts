import { Moment } from 'moment';
import { ITarefa } from 'app/shared/model/tarefa.model';

export interface IAndamento {
  id?: number;
  dataAndamento?: Moment;
  descricao?: string;
  tarefaAndamento?: ITarefa;
}

export class Andamento implements IAndamento {
  constructor(public id?: number, public dataAndamento?: Moment, public descricao?: string, public tarefaAndamento?: ITarefa) {}
}
