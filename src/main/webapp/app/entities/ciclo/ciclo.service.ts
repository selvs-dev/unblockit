import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICiclo } from 'app/shared/model/ciclo.model';

type EntityResponseType = HttpResponse<ICiclo>;
type EntityArrayResponseType = HttpResponse<ICiclo[]>;

@Injectable({ providedIn: 'root' })
export class CicloService {
  public resourceUrl = SERVER_API_URL + 'api/ciclos';

  constructor(protected http: HttpClient) {}

  create(ciclo: ICiclo): Observable<EntityResponseType> {
    return this.http.post<ICiclo>(this.resourceUrl, ciclo, { observe: 'response' });
  }

  update(ciclo: ICiclo): Observable<EntityResponseType> {
    return this.http.put<ICiclo>(this.resourceUrl, ciclo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICiclo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICiclo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
