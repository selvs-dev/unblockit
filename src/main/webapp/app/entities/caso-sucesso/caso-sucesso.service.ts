import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICasoSucesso } from 'app/shared/model/caso-sucesso.model';

type EntityResponseType = HttpResponse<ICasoSucesso>;
type EntityArrayResponseType = HttpResponse<ICasoSucesso[]>;

@Injectable({ providedIn: 'root' })
export class CasoSucessoService {
  public resourceUrl = SERVER_API_URL + 'api/caso-sucessos';

  constructor(protected http: HttpClient) {}

  create(casoSucesso: ICasoSucesso): Observable<EntityResponseType> {
    return this.http.post<ICasoSucesso>(this.resourceUrl, casoSucesso, { observe: 'response' });
  }

  update(casoSucesso: ICasoSucesso): Observable<EntityResponseType> {
    return this.http.put<ICasoSucesso>(this.resourceUrl, casoSucesso, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICasoSucesso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICasoSucesso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
