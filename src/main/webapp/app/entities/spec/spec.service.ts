import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISpec } from 'app/shared/model/spec.model';

type EntityResponseType = HttpResponse<ISpec>;
type EntityArrayResponseType = HttpResponse<ISpec[]>;

@Injectable({ providedIn: 'root' })
export class SpecService {
  public resourceUrl = SERVER_API_URL + 'api/specs';

  constructor(protected http: HttpClient) {}

  create(spec: ISpec): Observable<EntityResponseType> {
    return this.http.post<ISpec>(this.resourceUrl, spec, { observe: 'response' });
  }

  update(spec: ISpec): Observable<EntityResponseType> {
    return this.http.put<ISpec>(this.resourceUrl, spec, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISpec>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISpec[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
