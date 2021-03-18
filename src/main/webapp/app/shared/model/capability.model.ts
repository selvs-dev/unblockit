import { IPratica } from 'app/shared/model/pratica.model';

export interface ICapability {
  id?: number;
  nome?: string;
  praticas?: IPratica[];
}

export class Capability implements ICapability {
  constructor(public id?: number, public nome?: string, public praticas?: IPratica[]) {}
}
