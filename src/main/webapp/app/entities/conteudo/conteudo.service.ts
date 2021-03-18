import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConteudo } from 'app/shared/model/conteudo.model';

type EntityResponseType = HttpResponse<IConteudo>;
type EntityArrayResponseType = HttpResponse<IConteudo[]>;

@Injectable({ providedIn: 'root' })
export class ConteudoService {
  public resourceUrl = SERVER_API_URL + 'api/conteudos';

  constructor(protected http: HttpClient) {}

  create(conteudo: IConteudo): Observable<EntityResponseType> {
    return this.http.post<IConteudo>(this.resourceUrl, conteudo, { observe: 'response' });
  }

  update(conteudo: IConteudo): Observable<EntityResponseType> {
    return this.http.put<IConteudo>(this.resourceUrl, conteudo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConteudo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConteudo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
