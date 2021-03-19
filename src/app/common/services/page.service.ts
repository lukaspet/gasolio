import { Injectable } from '@angular/core';
import { Page } from '../../models/page';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { EnvironmentUrlService } from './environment-url.service';
import { NotifierService } from 'angular-notifier';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private readonly notifier: NotifierService;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService, notifierService: NotifierService,
              private loggingservice: LoggingService) {
    this.notifier = notifierService;
  }

  private createCompleteRoute( envAddress: string): any {
    return `${envAddress}/pages`;
  }
  /** GET: get pages from server */
  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.createCompleteRoute(this.envUrl.urlAddress))
    .pipe(
      tap(),
      catchError(this.handleError<Page[]>('getPage', []))
    );
  }
  /** POST: add a new page to the server */
  addPage(page: Page): Observable<Page> {
  return this.http.post<Page>(this.createCompleteRoute(this.envUrl.urlAddress), page, this.httpOptions).pipe(
      tap((newPage: Page) => this.loggingservice.info(`added page with id=${newPage.id}`,
      this.createCompleteRoute(this.envUrl.urlAddress)).subscribe()));
  }
     /** PUT: update the page on the server */
  updatePage(page: Page): Observable<any> {
    const id = page.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.put(url, page, this.httpOptions).pipe(
      tap(_ => {
        this.loggingservice.info(`Updated page with id=${page.id}`,
        this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
        this.notifier.notify('success', `Page ${page.name} modificato!`);
    }));
  }
  /** DELETE: delete page from server */
  deletePage(page: Page): Observable<Page> {
    // const id = typeof page === 'number' ? page : page.id;
    const id = page.id;
    const url = `${this.createCompleteRoute(this.envUrl.urlAddress)}/${id}`;
    return this.http.delete<Page>(url, this.httpOptions).pipe(
      tap(_ => {
        this.loggingservice.info(`Page ${page.name} deleted with id=${id}`,
        this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
        this.notifier.notify('success', `Page ${page.name}  eliminato!`);
      })
    );
  }
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      this.loggingservice.error(`error page=${error.message}`, this.createCompleteRoute(this.envUrl.urlAddress)).subscribe();
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

