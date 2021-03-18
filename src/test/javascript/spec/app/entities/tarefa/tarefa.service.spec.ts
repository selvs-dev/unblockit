import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { TarefaService } from 'app/entities/tarefa/tarefa.service';
import { ITarefa, Tarefa } from 'app/shared/model/tarefa.model';

describe('Service Tests', () => {
  describe('Tarefa Service', () => {
    let injector: TestBed;
    let service: TarefaService;
    let httpMock: HttpTestingController;
    let elemDefault: ITarefa;
    let expectedResult: ITarefa | ITarefa[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TarefaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Tarefa(0, 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataLimite: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Tarefa', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataLimite: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataLimite: currentDate,
          },
          returnedFromService
        );

        service.create(new Tarefa()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Tarefa', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            dataLimite: currentDate.format(DATE_FORMAT),
            concluida: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataLimite: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Tarefa', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            dataLimite: currentDate.format(DATE_FORMAT),
            concluida: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataLimite: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Tarefa', () => {
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
