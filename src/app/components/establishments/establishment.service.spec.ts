import { Establishment } from './establishment.model';
import { EstablishmentService } from './establishment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('Establishment Service', () => {
  let service: EstablishmentService;
  let backend: HttpTestingController;
  const baseUrl = 'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments';
  const mockEstablishments: Establishment[] = [{
    id: '5e34937af59dabb9a2c4c05f',
    index: 0,
    guid: '7d35ec3a-1462-49cc-adec-1726f98862e1',
    picture: 'http://placehold.it/32x32',
    name: 'Gink',
    email: 'contato@gink.com',
    phone: '+1 (859) 505-2620',
    address: '808 Ford Street, Westerville, Nevada, 6937',
    registered: 'Sunday, September 18, 2016 10:04 AM',
    latitude: '37.849767',
    longitude: '-58.807759'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        EstablishmentService,
      ]
    });
    service = TestBed.get(EstablishmentService);
    backend = TestBed.get(HttpTestingController);
  });

  describe('getEstablishments', () => {
    it('should handle error', () => {
      service.getEstablishments().subscribe(
        res => res,
        err => expect(err).toEqual(jasmine.any(String))
      );
      backend.expectOne(baseUrl).flush(null, { status: 400, statusText: null });
    });

    it('should handle forecast data', () => {
      service.getEstablishments().subscribe(
        (res) => expect(res).toEqual(mockEstablishments)
      );
      backend.expectOne(baseUrl).flush(mockEstablishments);
    });
  });
});
