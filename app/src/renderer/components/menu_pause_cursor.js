module.exports = function(game){
  const APP = require('swap-n-pop_app')
  const {UNIT} = require(APP.path.core('data'))
  class controller {
    constructor() {
      this.create = this.create.bind(this);
      this.map_controls = this.map_controls.bind(this);
      this.confirm = this.confirm.bind(this);
      this.up = this.up.bind(this);
      this.down = this.down.bind(this);
      this.update = this.update.bind(this);
    }

    create(menu,x,y,menu_items){
      this.menu = menu;
      this.x = x;
      this.y = y;
      this.menu_items = menu_items;
      this.sfx_confirm = game.add.audio('sfx_confirm');
      this.sfx_select  = game.add.audio('sfx_select');

      this.index  = 0;
      this.sprite = game.make.sprite(this.x, this.y+(this.index*UNIT), 'menu_pause_cursor');
      return this.menu.sprite.addChild(this.sprite);
    }
    map_controls() {
      return game.controls.map(this.menu.playfield.pi, {
        up   : this.up,
        down : this.down,
        a    : this.confirm,
        start: this.confirm
      }
      );
    }
    confirm() {
      this.sfx_confirm.play();
      return this.menu_items[this.index]();
    }
    up() {
      if (this.index !== 0) {
        this.sfx_select.play();
        return this.index--;
      }
    }
    down() {
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
