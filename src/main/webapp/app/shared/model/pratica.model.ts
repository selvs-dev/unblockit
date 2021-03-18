import { ICapability } from 'app/shared/model/capability.model';

export interface IPratica {
  id?: number;
  nome?: string;
  capabilityPratica?: ICapability;
}

export class Pratica implements IPratica {
  constructor(public id?: number, public nome?: string, public capabilityPratica?: ICapability) {}
}
