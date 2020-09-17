import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  gameCategories: string[] = [];
  
  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gamesService.getAllCategories().subscribe(
      this.getCategoriesSuccess.bind(this),
      this.requestFail.bind(this)
    );
  }

  getCategoriesSuccess(categories: string[]): void {
    this.gameCategories = categories;
  }

  requestFail(fail): void {
    console.log(fail);
  }

}
