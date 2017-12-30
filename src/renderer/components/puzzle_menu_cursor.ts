import game     from 'core/game'
import controls from 'core/controls'
import puzzles  from 'core/puzzles'
import { UNIT } from 'core/data'

export default class PuzzleSelectCursor {
  private x     : number
  private y     : number
  private index : number
  private sprite : Phaser.Sprite
  // need to figure out what this parent is suppose to be
  private parent : any

  create(parent, x, y) {
    this.x = x;
    this.y = y;
    this.index  = 0;

    this.sprite = game.make.sprite(this.x, this.y + (this.index * UNIT), 'menu_cursor');
    this.parent = parent;
    this.parent.sprite.addChild(this.sprite);

    this.map_controls(0);
    this.map_controls(1);
  }

  map_controls(pi) {
    return controls.map(pi, {
      up   : this.up.bind(this),
      down : this.down.bind(this),
      a    : this.confirm.bind(this),
      b    : this.cancel.bind(this),
      start: this.confirm.bind(this)
    });
  }

  up(tick) {
    if (tick > 0)
      return;

    if (this.index > 0)
      --this.index;
  }

  down(tick) {
    if (tick > 0)
      return;

    if (this.index < puzzles.length - 1)
      ++this.index;
  }

  confirm(tick) {
    game.state.start("mode_puzzle", true, false, { chosen_index: this.index });
  }

  cancel(tick) {
    if (tick > 0)
      return;
    game.state.start("menu")
  }

  update() {
    this.sprite.y = this.y + (this.index * UNIT);
  }
}
