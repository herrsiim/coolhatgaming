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

  /**
   * Will toggle the menu for mobile view
   */
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  /**
   * Small helper function to add word "game" behind
   * top and new category name.
   * @param name category name
   */
  getCategoryName(name: string): String {
    switch (name) {
      case "top":
        return "top games";
        break;
        case "new":
          return "new games";
          break;
      default:
        return name;
        break;
    }
  }

  /**
   * This will switch the category filter on the home page
   * The selected category will be sent to parent component
   * @param category name
   */
  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.selectCategory.emit(category);
    this.router.navigate([], { queryParams: { category: category } });
  }

  /**
   * Will build categories for the nav. bar
   * It will also check if we have a url parameter set
   * @param categories
   */
  getCategoriesSuccess(categories: string[]): void {
    this.gameCategories = categories;
    this.navigateOnPageRefresh();
  }

  /**
   * URL support for filtering categories
   * It will set correct filter for displaying games in categories
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
