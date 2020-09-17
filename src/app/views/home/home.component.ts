import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { Game } from 'src/app/models/games';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  allGames: Array<Game> = [];
  selectedCategory: string = 'top';

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gamesService.getAllGames().subscribe(
      this.allGamesSuccess.bind(this),
      this.errorHandle.bind(this)
    );
  }

  /**
   * This will decide if we should show ribbon or not.
   * We must not show "new" on "new category" and "top" with "top"
   * @param categories array of category strings
   */
  displayRibbon(categories: string[]): boolean {
    if (this.selectedCategory === 'new') {
      if (categories.includes('top')) return true;
    } else if (this.selectedCategory === 'top') {
      if (categories.includes('new')) return true;
    } else {
      if (categories.includes('new') || categories.includes('top')) {
        return true;
      }
    }
    return false;
  }

  /**
   * Based on previous discussions, the "top" will always overrule the "new"
   * if one item has both categories.
   * @param categories array of category strings
   */
  getRibbonText(categories: string[]): string {
    if (this.selectedCategory === 'new') {
      if (categories.includes('top')) return 'top';
    } else if (this.selectedCategory === 'top') {
      if (categories.includes('new')) return 'new';
    } else {
      if (categories.includes('top')) {
        return 'top';
      } else if (categories.includes('new')) {
        return 'new';
      } else {
        return '';
      }
    }
   
  }

  switchCategory(selectedItem): void {
    console.log(selectedItem);
    this.selectedCategory = selectedItem;
  }

  allGamesSuccess(games: Game[]): void {
    this.allGames = games;
  }

  errorHandle(error: any): void {
    console.log(error);
  }

}
