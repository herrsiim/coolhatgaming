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
  category: string = "top"; // Hardcoded value

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gamesService.getAllGames().subscribe(
      this.allGamesSuccess.bind(this),
      this.errorHandle.bind(this)
    );
  }

  switchCategory(selectedItem): void {
    console.log(selectedItem);
    this.category = selectedItem;
  }

  allGamesSuccess(games: Game[]): void {
    this.allGames = games;
  }

  errorHandle(error: any): void {
    console.log(error);
  }

}
