import { ISquad } from 'app/shared/model/squad.model';

export interface ICasoSucesso {
  id?: number;
  descricao?: string;
  confirmado?: string;
  squadCasoSucesso?: ISquad;
}

export class CasoSucesso implements ICasoSucesso {
  constructor(public id?: number, public descricao?: string, public confirmado?: string, public squadCasoSucesso?: ISquad) {}
}
