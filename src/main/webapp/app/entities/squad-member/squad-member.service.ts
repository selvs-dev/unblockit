import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISquadMember } from 'app/shared/model/squad-member.model';

type EntityResponseType = HttpResponse<ISquadMember>;
type EntityArrayResponseType = HttpResponse<ISquadMember[]>;

@Injectable({ providedIn: 'root' })
export class SquadMemberService {
  public resourceUrl = SERVER_API_URL + 'api/squad-members';

  constructor(protected http: HttpClient) {}

  create(squadMember: ISquadMember): Observable<EntityResponseType> {
    return this.http.post<ISquadMember>(this.resourceUrl, squadMember, { observe: 'response' });
  }

  update(squadMember: ISquadMember): Observable<EntityResponseType> {
    return this.http.put<ISquadMember>(this.resourceUrl, squadMember, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISquadMember>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISquadMember[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
