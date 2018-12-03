import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AppSettings } from '../../app/app-settings';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private settings :AppSettings) {}
  post(url, data): Observable<any> {
    return this.http.post<any>(this.settings.endpoint + url,JSON.stringify(data), this.settings.httpOptions).pipe(
      tap((data) => console.log(`post  sent w/ data=${JSON.stringify(data)}`)),
      catchError(this.handleError<any>('post'))
    );
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
