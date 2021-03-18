import { ISquad } from 'app/shared/model/squad.model';

export interface ICiclo {
  id?: number;
  nome?: string;
  squads?: ISquad[];
}

export class Ciclo implements ICiclo {
  constructor(public id?: number, public nome?: string, public squads?: ISquad[]) {}
}
