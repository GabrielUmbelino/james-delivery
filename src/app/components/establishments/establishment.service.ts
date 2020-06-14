import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Establishment } from './establishment.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class EstablishmentService {
  private endpointUrl: string;
  public loading: boolean;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.endpointUrl = 'https://my-json-server.typicode.com/james-delivery/frontend-challenge/establishments/';
  }

  public loadEstablishments(): Observable<Establishment[]> {
    return this.http
      .get<Establishment[]>(
        this.endpointUrl,
      ).pipe(
        map((establishments: Establishment[]) => {
          this.localStorageService.set(establishments);
          return this.getEstablishments();
        }),
        catchError(err => this.errorHandler(err))
      );
  }

  public getEstablishments(): Establishment[] {
    return this.localStorageService.get();
  }

  public getEstablishment(establishmentId: string): Establishment {
    const establishments = this.getEstablishments();
    if (!establishments.length) {
      return ;
    }
    return this.getEstablishments().find(e => establishmentId === e.id );
  }

  public putEstablishment(establishment: Establishment): void {
    this.localStorageService.set(this.getEstablishments().map(e => establishment.id === e.id ? establishment : e));
  }

  private errorHandler(error: any): Observable<never> {
    return throwError(error.message || 'server error.');
  }
}
