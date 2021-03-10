import { Injectable } from '@angular/core';
import { Automezzo } from '../../models/automezzo';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { NotifierService } from 'angular-notifier';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AutomezzoService {
  private readonly notifier: NotifierService;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, notifierService: NotifierService,
              private loggingservice: LoggingService) {
    this.notifier = notifierService;
  }

  private createCompleteRoute( envAddress: string): string {
    return `${envAddress}/automezzo`;
  }
  /** GET: get automezzo from server */
  getAutomezzi(): Observable<Automezzo[]> {
    return this.http.get<Automezzo[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(),
      catchError(this.handleError<Automezzo[]>('getAutomezzo', []))
    );
  }
  /** POST: add a new automezzo to the server */
  addAutomezzo(automezzo: Automezzo): Observable<Automezzo> {
  return this.http.post<Automezzo>(this.createCompleteRoute(this.envUrl.urlAddress), automezzo, this.httpOptions).pipe(
      tap((newAutomezzo: Automezzo) => this.loggingservice.info(`added automezzo with id=${newAutomezzo.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
     /** PUT: update the automezzo on the server */
  updateAutomezzo(automezzo: Automezzo): Observable<any> {
    const id = automezzo.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, automezzo, this.httpOptions).pipe(
      tap(_ => {
        this.loggingservice.info(`updated automezzo with id=${automezzo.id}`,
        this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
        this.notifier.notify('success', `Automezzo ${automezzo.tagMezzo} modificato!`);
    }));
  }
  /** DELETE: delete automezzo from server */
  deleteAutomezzo(automezzo: Automezzo): Observable<Automezzo> {
    // const id = typeof automezzo === 'number' ? automezzo : automezzo.id;
    const id = automezzo.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;

    return this.http.delete<Automezzo>(url, this.httpOptions).pipe(
      tap(_ => {
        this.loggingservice.info(`automezzo ${automezzo.tagMezzo} deleted with id=${id}`,
        this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
        this.notifier.notify('success', `Automezzo ${automezzo.tagMezzo} eliminato!`);
      })
    );
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      this.loggingservice.error(`error automezzo=${error.message}`, this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
