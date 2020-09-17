import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  gameCategories: string[] = [];
  activeCategory: string = "top";

  @Output() selectCategory = new EventEmitter<string>();
  
  constructor(
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.gamesService.getAllCategories().subscribe(
      this.getCategoriesSuccess.bind(this),
      this.requestFail.bind(this)
    );
  }

  setActive(category: string): void {
    this.activeCategory = category;
    this.selectCategory.emit(category);
  }

  getCategoriesSuccess(categories: string[]): void {
    this.gameCategories = categories;
  }

  requestFail(fail): void {
    console.log(fail);
  }

}
