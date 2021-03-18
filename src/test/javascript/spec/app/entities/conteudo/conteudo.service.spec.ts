import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConteudoService } from 'app/entities/conteudo/conteudo.service';
import { IConteudo, Conteudo } from 'app/shared/model/conteudo.model';
import { TIPOCONTEUDO } from 'app/shared/model/enumerations/tipoconteudo.model';

describe('Service Tests', () => {
  describe('Conteudo Service', () => {
    let injector: TestBed;
    let service: ConteudoService;
    let httpMock: HttpTestingController;
    let elemDefault: IConteudo;
    let expectedResult: IConteudo | IConteudo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ConteudoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Conteudo(0, TIPOCONTEUDO.KICKOFF, 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Conteudo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Conteudo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Conteudo', () => {
        const returnedFromService = Object.assign(
          {
            tipo: 'BBBBBB',
            obs: 'BBBBBB',
            confirmado: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Conteudo', () => {
        const returnedFromService = Object.assign(
          {
            tipo: 'BBBBBB',
            obs: 'BBBBBB',
            confirmado: true,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Conteudo', () => {
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
