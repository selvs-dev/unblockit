import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICapability } from 'app/shared/model/capability.model';

type EntityResponseType = HttpResponse<ICapability>;
type EntityArrayResponseType = HttpResponse<ICapability[]>;

@Injectable({ providedIn: 'root' })
export class CapabilityService {
  public resourceUrl = SERVER_API_URL + 'api/capabilities';

  constructor(protected http: HttpClient) {}

  create(capability: ICapability): Observable<EntityResponseType> {
    return this.http.post<ICapability>(this.resourceUrl, capability, { observe: 'response' });
  }

  update(capability: ICapability): Observable<EntityResponseType> {
    return this.http.put<ICapability>(this.resourceUrl, capability, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICapability>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICapability[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
