import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISquad } from 'app/shared/model/squad.model';

type EntityResponseType = HttpResponse<ISquad>;
type EntityArrayResponseType = HttpResponse<ISquad[]>;

@Injectable({ providedIn: 'root' })
export class SquadService {
  public resourceUrl = SERVER_API_URL + 'api/squads';

  constructor(protected http: HttpClient) {}

  create(squad: ISquad): Observable<EntityResponseType> {
    return this.http.post<ISquad>(this.resourceUrl, squad, { observe: 'response' });
  }

  update(squad: ISquad): Observable<EntityResponseType> {
    return this.http.put<ISquad>(this.resourceUrl, squad, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISquad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISquad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
