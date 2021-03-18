import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDepoimento } from 'app/shared/model/depoimento.model';

type EntityResponseType = HttpResponse<IDepoimento>;
type EntityArrayResponseType = HttpResponse<IDepoimento[]>;

@Injectable({ providedIn: 'root' })
export class DepoimentoService {
  public resourceUrl = SERVER_API_URL + 'api/depoimentos';

  constructor(protected http: HttpClient) {}

  create(depoimento: IDepoimento): Observable<EntityResponseType> {
    return this.http.post<IDepoimento>(this.resourceUrl, depoimento, { observe: 'response' });
  }

  update(depoimento: IDepoimento): Observable<EntityResponseType> {
    return this.http.put<IDepoimento>(this.resourceUrl, depoimento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepoimento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepoimento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
