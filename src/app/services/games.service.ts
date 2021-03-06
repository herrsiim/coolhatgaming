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
   * 
   * We also have to move the Top and New in front of the array. 
   * reorderItems function will take care of that
   */
  public getAllCategories(): Observable<string[]> {
    return this.httpClient.get<Array<Game>>(`${environment.gameFeed}`)
      .pipe(
        map(games => {
          let filteredCategories: Array<string> = [];
          for (let game of games) {
            for (let gameCategory of game.categories) {
              if (!filteredCategories.includes(gameCategory)) {
                if (gameCategory != 'fun' && gameCategory != 'virtual' && gameCategory != 'ball') {
                  filteredCategories.push(gameCategory);
                }
              }
            }
          }
          filteredCategories.push('other');
          this.reorderItems(filteredCategories);
          return filteredCategories;
        }),
        retry(3),
        catchError(this.handleError)
      );
  }

  /**
   * This will take "new" and "top" from the array
   * and will put them in front. It also checks if they exist.
   * 
   * NOTICE: We don't need to return anything from this function.
   * @param items category items
   */
  private reorderItems(items: string[]): void {
    if (items.includes('new')) {
      items.splice(items.indexOf('new'), 1);
      items.unshift('new');
    }
    if (items.includes('top')) {
      items.splice(items.indexOf('top'), 1);
      items.unshift('top');
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
