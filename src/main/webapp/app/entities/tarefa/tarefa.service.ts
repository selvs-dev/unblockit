import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITarefa } from 'app/shared/model/tarefa.model';

type EntityResponseType = HttpResponse<ITarefa>;
type EntityArrayResponseType = HttpResponse<ITarefa[]>;

@Injectable({ providedIn: 'root' })
export class TarefaService {
  public resourceUrl = SERVER_API_URL + 'api/tarefas';

  constructor(protected http: HttpClient) {}

  create(tarefa: ITarefa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tarefa);
    return this.http
      .post<ITarefa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tarefa: ITarefa): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tarefa);
    return this.http
      .put<ITarefa>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITarefa>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITarefa[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tarefa: ITarefa): ITarefa {
    const copy: ITarefa = Object.assign({}, tarefa, {
      dataLimite: tarefa.dataLimite && tarefa.dataLimite.isValid() ? tarefa.dataLimite.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataLimite = res.body.dataLimite ? moment(res.body.dataLimite) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tarefa: ITarefa) => {
        tarefa.dataLimite = tarefa.dataLimite ? moment(tarefa.dataLimite) : undefined;
      });
    }
    return res;
  }
}
