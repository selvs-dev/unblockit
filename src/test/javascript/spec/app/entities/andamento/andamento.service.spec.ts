import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { AndamentoService } from 'app/entities/andamento/andamento.service';
import { IAndamento, Andamento } from 'app/shared/model/andamento.model';

describe('Service Tests', () => {
  describe('Andamento Service', () => {
    let injector: TestBed;
    let service: AndamentoService;
    let httpMock: HttpTestingController;
    let elemDefault: IAndamento;
    let expectedResult: IAndamento | IAndamento[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AndamentoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Andamento(0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataAndamento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Andamento', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataAndamento: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataAndamento: currentDate,
          },
          returnedFromService
        );

        service.create(new Andamento()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Andamento', () => {
        const returnedFromService = Object.assign(
          {
            dataAndamento: currentDate.format(DATE_FORMAT),
            descricao: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataAndamento: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Andamento', () => {
        const returnedFromService = Object.assign(
          {
            dataAndamento: currentDate.format(DATE_FORMAT),
            descricao: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataAndamento: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Andamento', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
