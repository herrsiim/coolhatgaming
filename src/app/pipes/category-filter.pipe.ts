import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models/games';

@Pipe({
  name: 'categoryFilter'
})

export class CategoryFilterPipe implements PipeTransform {

  transform(items: Game[], args: any): any {
    if (args === null) return items;

    let filteredItems: Game[] = [];

    for (let game of items) {
      if (game.categories.includes(args)) filteredItems.push(game)
    }

    return filteredItems;
  }

}
