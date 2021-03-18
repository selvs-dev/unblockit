import { Moment } from 'moment';
import { IConteudo } from 'app/shared/model/conteudo.model';

export interface ISlot {
  id?: number;
  data?: Moment;
  obs?: string;
  confirmado?: boolean;
  conteudos?: IConteudo[];
}

export class Slot implements ISlot {
  constructor(public id?: number, public data?: Moment, public obs?: string, public confirmado?: boolean, public conteudos?: IConteudo[]) {
    this.confirmado = this.confirmado || false;
  }
}
