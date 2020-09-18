import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { JackpotService } from 'src/app/services/jackpot.service';
import { Game } from 'src/app/models/games';
import { Jackpot } from 'src/app/models/jackpot';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  allGames: Array<Game> = [];
  selectedCategory: string = 'top';
  allJackpots: Jackpot[] = [];
  jackpotInterval: any; 
  jackpotIntervalSeconds: number = 3;

  constructor(
    private gamesService: GamesService,
    private jackpotService: JackpotService
  ) { }

  ngOnInit(): void {
    this.gamesService.getAllGames().subscribe(
      this.allGamesSuccess.bind(this),
      this.errorHandle.bind(this)
    );
  }

  /**
   * Clear interval when component has been destroyed
   */
  ngOnDestroy(): void {
    clearInterval(this.jackpotInterval);
  }
  
  /**
   * If image has a broken link or is not found, we use fallback image
   * @param img html image
   */
  imgNotFound(img: any) {
    img.currentTarget.src = "/assets/img/img-error.jpg";
  }


  jackpotSuccess(data: Jackpot[]): void {
    this.allJackpots = data;
  }

  /**
   * This will get the jackpot for a single game
   * @param id game id
   */
  getSingleJackpot(id: string): string {
    for (let jackpot of this.allJackpots) {
      if (jackpot.game === id) {
        return `&#163;${this.numberWithCommas(jackpot.amount)}`;
      }
    }
  }

  numberWithCommas(number: number): string {
    if (number === 0) {
      return '0';
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  hasJackpot(id: string): boolean {
    for (let jackpot of this.allJackpots) {
      if (jackpot.game === id) {
        return true;
      }
    }
    return false;
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

  /**
   * Filters out all games based on selected category
   * @param selectedItem games category
   */
  switchCategory(selectedItem): void {
    this.selectedCategory = selectedItem;
  }

  /**
   * Will display all available games. This function will also 
   * start interval for available jackpots.
   * @param games all available games which have been requested
   */
  allGamesSuccess(games: Game[]): void {
    this.allGames = games;
    this.getJackpots(); // We get first jackpots when all games are loaded
    this.jackpotInterval = setInterval(() => {
      this.getJackpots();
    }, 1000 * this.jackpotIntervalSeconds);

  }

  getJackpots() {
    this.jackpotService.getAllJackpot().subscribe(
      this.jackpotSuccess.bind(this),
      this.errorHandle.bind(this)
    );
  }

  errorHandle(error: any): void {
    console.log(error);
  }
}
