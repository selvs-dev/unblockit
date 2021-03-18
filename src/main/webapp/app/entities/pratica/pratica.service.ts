import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPratica } from 'app/shared/model/pratica.model';

type EntityResponseType = HttpResponse<IPratica>;
type EntityArrayResponseType = HttpResponse<IPratica[]>;

@Injectable({ providedIn: 'root' })
export class PraticaService {
  public resourceUrl = SERVER_API_URL + 'api/praticas';

  constructor(protected http: HttpClient) {}

  create(pratica: IPratica): Observable<EntityResponseType> {
    return this.http.post<IPratica>(this.resourceUrl, pratica, { observe: 'response' });
  }

  update(pratica: IPratica): Observable<EntityResponseType> {
    return this.http.put<IPratica>(this.resourceUrl, pratica, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPratica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPratica[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
