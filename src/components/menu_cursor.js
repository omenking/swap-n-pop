module.exports = function(game){
  const {UNIT, MENUCURSORBLINK} = require('./../core/data')
  class controller {
    constructor() {
      this.create = this.create.bind(this);
      this.map_controls = this.map_controls.bind(this);
      this.up = this.up.bind(this);
      this.down = this.down.bind(this);
      this.confirm = this.confirm.bind(this);
      this.cancel = this.cancel.bind(this);
      this.update = this.update.bind(this);
    }

    create(menu,x,y,menu_items){
      this.menu = menu;
      this.x = x;
      this.y = y;
      this.menu_items = menu_items;
      this.sfx_confirm = game.add.audio('sfx_confirm');
      this.sfx_select  = game.add.audio('sfx_select');

      this.counter = 0;
      this.index  = 0;
      this.sprite = game.make.sprite(this.x, this.y+(this.index*UNIT), 'menu_cursor');
      this.menu.sprite.addChild(this.sprite);

      this.map_controls(0);
      this.map_controls(1);
    }
    map_controls(pi){
      return game.controls.map(pi, {
        up   : this.up,
        down : this.down,
        a    : this.confirm,
        b    : this.cancel,
        start: this.confirm
      });
    }
    up() {
      if (this.index !== 0) {
        this.sfx_select.play();
        this.counter = 0;
        this.sprite.visible = true;
        return this.index--;
      }
    }
    down() {
      if (this.index !== (this.menu_items.length-1)) {
        this.sfx_select.play();
        this.counter = 0;
        this.sprite.visible = true;
        return this.index++;
      }
    }
    confirm() {
      this.sfx_confirm.play();
      return this.menu_items[this.index]();
    }
    cancel() {
      return console.log('cancel');
    }
    update() {
      this.sprite.y = this.y+(this.index*UNIT);
      this.counter++;
      if (this.counter > MENUCURSORBLINK) {
        this.counter = 0;
        return this.sprite.visible = !this.sprite.visible;
      }
    }
  };

  return controller
}
