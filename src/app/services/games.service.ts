import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Game } from '../models/games';

@Injectable({
  providedIn: 'root'
})

export class GamesService {
  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllGames(): Observable<Array<Game>> {
    return this.httpClient.get<Array<Game>>(`${environment.gameFeed}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * This will filter out all game categories into a single array of strings.
   * The main usage for this is to display all elements on the nav-bar.
   * 
   * We also remove the following categories from the list: Fun, Virtual, Ball
   * and add a one singe instance for them called "Other"
   */
  public getAllCategories(): Observable<string[]> {
    return this.httpClient.get<Array<Game>>(`${environment.gameFeed}`)
      .pipe(
        map(games => {
          let filteredCategories: Array<string> = [];
          for (let game of games) {
            for (let gameCategory of game.categories) {
              if (!filteredCategories.includes(gameCategory)) { 
                if(gameCategory != 'fun' && gameCategory != 'virtual' && gameCategory != 'ball') {
                  filteredCategories.push(gameCategory); 
                }
              }
            }
          }
          filteredCategories.push('other');
          return filteredCategories;
        }),
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
