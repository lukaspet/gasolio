import { Injectable } from '@angular/core';
import { Autista } from '../../models/autista';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { NotifierService } from 'angular-notifier';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AutistaService {
  private readonly notifier: NotifierService;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, notifierService: NotifierService,
              private loggingservice: LoggingService) {
    this.notifier = notifierService;
  }

  private createCompleteRoute( envAddress: string): any {
    return `${envAddress}/autista`;
  }
  /** GET: get autisti from server */
  getAutisti(): Observable<Autista[]> {
    return this.http.get<Autista[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(),
      catchError(this.handleError<Autista[]>('getAutista', []))
    );
  }
  /** POST: add a new autista to the server */
  addAutista(autista: Autista): Observable<Autista> {
  return this.http.post<Autista>(this.createCompleteRoute(this.envUrl.urlAddress), autista, this.httpOptions).pipe(
      tap((newAutista: Autista) => this.loggingservice.info(`added autista with id=${newAutista.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
     /** PUT: update the autista on the server */
  updateAutista(autista: Autista): Observable<any> {
    const id = autista.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, autista, this.httpOptions).pipe(
      tap(_ => {
        this.loggingservice.info(`Updated autista with id=${autista.id}`,
        this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
        this.notifier.notify('success', `Autista ${autista.nome} ${autista.cognome} modificato!`);
    }));
  }
  /** DELETE: delete autista from server */
  deleteAutista(autista: Autista): Observable<Autista> {
    // const id = typeof autista === 'number' ? autista : autista.id;
    const id = autista.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.delete<Autista>(url, this.httpOptions).pipe(
      tap(_ => {
        this.loggingservice.info(`Autista ${autista.nome} ${autista.cognome} deleted with id=${id}`,
        this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
        this.notifier.notify('success', `Autista ${autista.nome} ${autista.cognome} eliminato!`);
      })
    );
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      this.loggingservice.error(`error autista=${error.message}`, this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
