import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFeedback } from 'app/shared/model/feedback.model';

type EntityResponseType = HttpResponse<IFeedback>;
type EntityArrayResponseType = HttpResponse<IFeedback[]>;

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  public resourceUrl = SERVER_API_URL + 'api/feedbacks';

  constructor(protected http: HttpClient) {}

  create(feedback: IFeedback): Observable<EntityResponseType> {
    return this.http.post<IFeedback>(this.resourceUrl, feedback, { observe: 'response' });
  }

  update(feedback: IFeedback): Observable<EntityResponseType> {
    return this.http.put<IFeedback>(this.resourceUrl, feedback, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFeedback>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFeedback[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
