import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Villano } from './villano';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class VillanosService {

  private villanosUrl = 'api/villanos';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getVillanos(): Observable<Villano[]> {
    return this.http.get<Villano[]>(this.villanosUrl)
      .pipe(
        tap(_ => this.log('fetched villanos')),
        catchError(this.handleError<Villano[]>('getVillanos', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getVillanoNo404<Data>(id: number): Observable<Villano> {
    const url = `${this.villanosUrl}/?id=${id}`;
    return this.http.get<Villano[]>(url)
      .pipe(
        map(villanos => villanos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} villano id=${id}`);
        }),
        catchError(this.handleError<Villano>(`getVillano id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getVillano(id: number): Observable<Villano> {
    const url = `${this.villanosUrl}/${id}`;
    return this.http.get<Villano>(url).pipe(
      tap(_ => this.log(`fetched villano id=${id}`)),
      catchError(this.handleError<Villano>(`getVillano id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchVillanos(term: string): Observable<Villano[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Villano[]>(`${this.villanosUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found villano matching "${term}"`) :
         this.log(`no villanos matching "${term}"`)),
      catchError(this.handleError<Villano[]>('searchVillano', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addVillano(villano: Villano): Observable<Villano> {
    return this.http.post<Villano>(this.villanosUrl, villano, this.httpOptions).pipe(
      tap((newHero: Villano) => this.log(`added villano w/ id=${newHero.id}`)),
      catchError(this.handleError<Villano>('addVillano'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteVillano(id: number): Observable<Villano> {
    const url = `${this.villanosUrl}/${id}`;

    return this.http.delete<Villano>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted villano id=${id}`)),
      catchError(this.handleError<Villano>('deleteVillano'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(villano: Villano): Observable<any> {
    return this.http.put(this.villanosUrl, villano, this.httpOptions).pipe(
      tap(_ => this.log(`updated villano id=${villano.id}`)),
      catchError(this.handleError<any>('updateVillano'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

  

