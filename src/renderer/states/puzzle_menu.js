import game from 'core/game'

import PuzzleMenuCursor from 'components/puzzle_menu_cursor'
import PuzzlesModule    from 'core/puzzles'

export default class PuzzleSelect {
  constructor() {
    this.cursor = new PuzzleMenuCursor();
  }

  create() {
    this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_green');
    
    this.sprite = game.add.sprite(0, 0, 'puzzle_menu');

    this.puzzles = new PuzzlesModule();
    this.cursor.create(this, 26, 39);
  }

  update() {
    this.sprite.x = game.width  / 4 - this.sprite.width  / 2;
    this.sprite.y = game.height / 8 - this.sprite.height / 2;

    this.cursor.update()
    game.controls.update();
    this.bg.tilePosition.y += 0.5;
    this.bg.tilePosition.x -= 0.5;
  }

  /** stops controller support */
  shutdown() {
    game.controls.disable();
  }
}
