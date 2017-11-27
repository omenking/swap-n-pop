module.exports = function(game) {
  const { UNIT } = require('../core/data');

  return class PuzzleSelectCursor {
    constructor() {
      this.up = this.up.bind(this);
      this.down = this.down.bind(this);
      this.confirm = this.confirm.bind(this);
      this.cancel = this.cancel.bind(this);
      this.update = this.update.bind(this);
    }

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
      return game.controls.map(pi, {
        up   : this.up,
        down : this.down,
        a    : this.confirm,
        b    : this.cancel,
        start: this.confirm
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
      
      if (this.index < this.parent.puzzles.puzzle_levels.length - 1)
        ++this.index;
    }

    confirm(tick) {
      game.state.start("mode_puzzle", true, false, { chosen_index: this.index });
    }

    cancel(tick) {
      if (tick > 0)
        return; 

      game.state.start("menu");
    }

    update() {
      this.sprite.y = this.y + (this.index * UNIT);
    }
  }
}
