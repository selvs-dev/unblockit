import { ISquad } from 'app/shared/model/squad.model';

export interface IDepoimento {
  id?: number;
  descricao?: string;
  confirmado?: string;
  squadDepoimento?: ISquad;
}

export class Depoimento implements IDepoimento {
  constructor(public id?: number, public descricao?: string, public confirmado?: string, public squadDepoimento?: ISquad) {}
}
