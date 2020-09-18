import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/games';

@Pipe({
  name: 'categoryFilter'
})

/**
 * This pipe will filter the games array on the home page.
 * 
 * There is a special case for when the argument is "Other". 
 * In this case we show games from 3 categories together:
 * Ball, Virtual, Fun
 */

export class CategoryFilterPipe implements PipeTransform {
  transform(items: Game[], args: any): any {
    if (args === null) return items;

    let filteredItems: Game[] = [];

    if (args === 'other') {
      for (let game of items) {
        if (game.categories.includes('ball') || game.categories.includes('virtual') || game.categories.includes('fun')) {
          filteredItems.push(game);
        }
      }
    } else {
      for (let game of items) {
        if (game.categories.includes(args)) filteredItems.push(game)
      }
    }

    return filteredItems;
  }

}
