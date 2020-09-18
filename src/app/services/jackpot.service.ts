import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Jackpot } from '../models/jackpot';

@Injectable({
  providedIn: 'root'
})

export class JackpotService {
  constructor(
    private httpClient: HttpClient
  ) { }
  
  public getAllJackpot(): Observable<Jackpot[]> {
    return this.httpClient.get<Jackpot[]>(`${environment.jackpotFeed}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
