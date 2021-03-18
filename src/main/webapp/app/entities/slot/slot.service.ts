import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISlot } from 'app/shared/model/slot.model';

type EntityResponseType = HttpResponse<ISlot>;
type EntityArrayResponseType = HttpResponse<ISlot[]>;

@Injectable({ providedIn: 'root' })
export class SlotService {
  public resourceUrl = SERVER_API_URL + 'api/slots';

  constructor(protected http: HttpClient) {}

  create(slot: ISlot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slot);
    return this.http
      .post<ISlot>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(slot: ISlot): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slot);
    return this.http
      .put<ISlot>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISlot>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISlot[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(slot: ISlot): ISlot {
    const copy: ISlot = Object.assign({}, slot, {
      data: slot.data && slot.data.isValid() ? slot.data.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((slot: ISlot) => {
        slot.data = slot.data ? moment(slot.data) : undefined;
      });
    }
    return res;
  }
}
