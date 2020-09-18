import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  gameCategories: string[] = [];
  activeCategory: string = "top"; // Default categoy selection
  showMenu: boolean = false; // For mobile menu toggle

  @Output() selectCategory = new EventEmitter<string>();

  constructor(
    private router: Router,
    private gamesService: GamesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.gamesService.getAllCategories().subscribe(
      this.getCategoriesSuccess.bind(this),
      this.requestFail.bind(this)
    );
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.selectCategory.emit(category);
    this.router.navigate([], { queryParams: { category: category } });
  }

  getCategoriesSuccess(categories: string[]): void {
    this.gameCategories = categories;
    this.navigateOnPageRefresh();
  }

  /**
   * URL support for filtering categories
   */
  navigateOnPageRefresh(): void {
    let categoryFromUrl = this.activatedRoute.snapshot.queryParams.category;
    if (categoryFromUrl && this.gameCategories.includes(categoryFromUrl)) {
      this.setActiveCategory(categoryFromUrl);
    }
  }

  requestFail(fail): void {
    console.log(fail);
  }

}
