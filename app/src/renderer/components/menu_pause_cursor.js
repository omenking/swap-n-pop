module.exports = function(game) {
  const APP = require('../../../app')('../../../');
  const {UNIT} = require(APP.path.core('data'));
  const {px}   = require(APP.path.core('filters'));

  /** Cursor to handle menu_pause movement and method calls
   *  could maybe be optimized by just calling the menu_pause methods here
   */
  return class MenuPauseCursor {
    /** only bindings, no new objects */
    constructor() {
      this.up = this.up.bind(this);
      this.down = this.down.bind(this);
      this.confirm = this.confirm.bind(this);
    }

    /**
     * sets the sprite position relative to the sprite of the menu
     * 
     * @param {menu_pause} menu reference 
     * @param {integer} x pos
     * @param {integer} y pos
     * @param {Array} menu_items functions from menu
     */
    create(menu, x, y, menu_items){
      this.menu = menu;
      this.x = x;
      this.y = y;
     
      // array with methods and its accessor index
      this.menu_items = menu_items;
      this.index  = 0;

      this.sprite = game.make.sprite(this.x, this.y, 'menu_pause_cursor');
      return this.menu.sprite.addChild(this.sprite);
    }

    /**
     * binds controls to methods of this cursor
     * @param {playerNumber} any_player_number 
     */
    map_controls(any_player_number) {
      return game.controls.map(any_player_number, {
        up   : this.up,
        down : this.down,
        a    : this.confirm,
        start: this.confirm
      }
      );
    }

    confirm(tick) {
      if (tick > 0) 
        return;

      game.sounds.confirm();
      return this.menu_items[this.index]();
    }

    up(tick) {
      if (tick > 0) 
        return;

      if (this.index !== 0) {
        game.sounds.select();
        return this.index--;
      }
    }

    down(tick) {
      if (tick > 0) 
        return;

      if (this.index !== (this.menu_items.length-1)) {
        game.sounds.select();
        return this.index++;
      }
    }
    
    update() {
      return this.sprite.y = this.y + (this.index * px(12));
    }
  }
}
