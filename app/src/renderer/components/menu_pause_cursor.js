module.exports = function(game){
  const APP = require('../../../app')('../../../')
  const {UNIT} = require(APP.path.core('data'))

  /** Cursor to handle menu_pause movement and method calls
   *  could maybe be optimized by just calling the menu_pause methods here
   */
  class controller {
    /** only bindings, no new objects */
    constructor() {
      this.create = this.create.bind(this);
      this.map_controls = this.map_controls.bind(this);
      this.confirm = this.confirm.bind(this);
      this.up = this.up.bind(this);
      this.down = this.down.bind(this);
      this.update = this.update.bind(this);
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

      this.sfx_confirm = game.add.audio('sfx_confirm');
      this.sfx_select  = game.add.audio('sfx_select');

      this.sprite = game.make.sprite(this.x, this.y+(this.index*UNIT), 'menu_pause_cursor');
      return this.menu.sprite.addChild(this.sprite);
    }

    /**
     * binds controls to methods of this cursor
     * @param {playerNumber} anyPlayerNumber 
     */
    map_controls(anyPlayerNumber) {
      return game.controls.map(anyPlayerNumber, {
        up   : this.up,
        down : this.down,
        a    : this.confirm,
        start: this.confirm
      }
      );
    }

    confirm(tick) {
      if (tick > 0) 
        return 

      this.sfx_confirm.play();
      return this.menu_items[this.index]();
    }

    up(tick) {
      if (tick > 0) { return }
      if (this.index !== 0) {
        this.sfx_select.play();
        return this.index--;
      }
    }

    down(tick) {
      if (tick > 0) { return }
      if (this.index !== (this.menu_items.length-1)) {
        this.sfx_select.play();
        return this.index++;
      }
    }
    
    update() {
      return this.sprite.y = this.y+(this.index*12);
    }
  }
  return controller
}
