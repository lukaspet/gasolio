import { TipoAutomezzo } from './../../models/tipoAutomezzo';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { NotifierService } from 'angular-notifier';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class TipoAutomezzoService {
  private readonly notifier: NotifierService;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, notifierService: NotifierService,
              private loggingservice: LoggingService) {
    this.notifier = notifierService;
  }

  private createCompleteRoute( envAddress: string): any {
    return `${envAddress}/tipo-automezzo`;
  }
  /** GET: get tipoAutomezzo from server */
  getTipoAutomezzo(): Observable<TipoAutomezzo[]> {
    return this.http.get<TipoAutomezzo[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(),
      catchError(this.handleError<TipoAutomezzo[]>('getTipoAutomezzo', []))
    );
  }
  /** POST: add a new tipoAutomezzo to the server */
  addTipoAutomezzo(tipoAutomezzo: TipoAutomezzo): Observable<TipoAutomezzo> {
  return this.http.post<TipoAutomezzo>(this.createCompleteRoute(this.envUrl.urlAddress), tipoAutomezzo, this.httpOptions).pipe(
      tap((newTipoAutomezzo: TipoAutomezzo) => this.loggingservice.info(`added tipoAutomezzo with id=${newTipoAutomezzo.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
     /** PUT: update the tipoAutomezzo on the server */
  updateTipoAutomezzo(tipoAutomezzo: TipoAutomezzo): Observable<any> {
    const id = tipoAutomezzo.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, tipoAutomezzo, this.httpOptions).pipe(
      tap(_ => {
        this.loggingservice.info(`updated tipoAutomezzo with id=${tipoAutomezzo.id}`,
        this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
        this.notifier.notify('success', `TipoAutomezzo ${tipoAutomezzo.tipoAutomezzo} modificato!`);
    }));
  }
  /** DELETE: delete tipoAutomezzo from server */
  deleteTipoAutomezzo(tipoAutomezzo: TipoAutomezzo): Observable<TipoAutomezzo> {
    // const id = typeof tipoAutomezzo === 'number' ? tipoAutomezzo : tipoAutomezzo.id;
    const id = tipoAutomezzo.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.delete<TipoAutomezzo>(url, this.httpOptions).pipe(
      tap(_ => {
        this.loggingservice.info(`TipoAutomezzo ${tipoAutomezzo.tipoAutomezzo} deleted with id=${id}`,
        this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
        this.notifier.notify('success', `TipoAutomezzo ${tipoAutomezzo.tipoAutomezzo} eliminato!`);
      })
    );
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      this.loggingservice.error(`error tipoAutomezzo=${error.message}`, this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
