import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAndamento } from 'app/shared/model/andamento.model';

type EntityResponseType = HttpResponse<IAndamento>;
type EntityArrayResponseType = HttpResponse<IAndamento[]>;

@Injectable({ providedIn: 'root' })
export class AndamentoService {
  public resourceUrl = SERVER_API_URL + 'api/andamentos';

  constructor(protected http: HttpClient) {}

  create(andamento: IAndamento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(andamento);
    return this.http
      .post<IAndamento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(andamento: IAndamento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(andamento);
    return this.http
      .put<IAndamento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAndamento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAndamento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(andamento: IAndamento): IAndamento {
    const copy: IAndamento = Object.assign({}, andamento, {
      dataAndamento: andamento.dataAndamento && andamento.dataAndamento.isValid() ? andamento.dataAndamento.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataAndamento = res.body.dataAndamento ? moment(res.body.dataAndamento) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((andamento: IAndamento) => {
        andamento.dataAndamento = andamento.dataAndamento ? moment(andamento.dataAndamento) : undefined;
      });
    }
    return res;
  }
}
