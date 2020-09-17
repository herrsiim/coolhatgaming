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

  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gamesService.getAllGames().subscribe(
      this.allGamesSuccess.bind(this),
      this.errorHandle.bind(this)
    );
  }

  allGamesSuccess(games: Game[]): void {
    this.allGames = games;
  }

  errorHandle(error: any) {
    console.log(error);
  }

}
