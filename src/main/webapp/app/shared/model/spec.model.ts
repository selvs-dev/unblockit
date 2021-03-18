import { PERFILSPEC } from 'app/shared/model/enumerations/perfilspec.model';

export interface ISpec {
  id?: number;
  nome?: string;
  perfil?: PERFILSPEC;
}

export class Spec implements ISpec {
  constructor(public id?: number, public nome?: string, public perfil?: PERFILSPEC) {}
}
