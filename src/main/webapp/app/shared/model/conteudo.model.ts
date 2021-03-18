import { ISlot } from 'app/shared/model/slot.model';
import { TIPOCONTEUDO } from 'app/shared/model/enumerations/tipoconteudo.model';

export interface IConteudo {
  id?: number;
  tipo?: TIPOCONTEUDO;
  obs?: string;
  confirmado?: boolean;
  slotConteudo?: ISlot;
}

export class Conteudo implements IConteudo {
  constructor(
    public id?: number,
    public tipo?: TIPOCONTEUDO,
    public obs?: string,
    public confirmado?: boolean,
    public slotConteudo?: ISlot
  ) {
    this.confirmado = this.confirmado || false;
  }
}
