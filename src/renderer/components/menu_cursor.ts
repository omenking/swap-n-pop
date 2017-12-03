import game from 'core/game'
import data from 'core/data'

const {UNIT, MENUCURSORBLINK} = data

export default class ComponentMenuCursor {
  private menu       : any
  public x           : number
  public y           : number
  private menu_items : Array<Function>
  private counter    : number
  private index      : number
  private sprite     : Phaser.Sprite

  constructor() {
  }

  create =(menu,x,y,menu_items)=> {
    this.menu = menu;
    this.x = x;
    this.y = y;
    this.menu_items = menu_items;

    this.counter = 0;
    this.index  = 0;
    this.sprite = game.make.sprite(this.x, this.y+(this.index*UNIT), 'menu_cursor');
    this.menu.sprite.addChild(this.sprite);

    this.map_controls(0)
    this.map_controls(1)
  }

  map_controls =(pi)=> {
    return game.controls.map(pi, {
      up   : this.up,
      down : this.down,
      a    : this.confirm,
      b    : this.cancel,
      start: this.confirm
    });
  }

  up =(tick)=> {
    if (tick > 0) { return }
    if (this.index !== 0) {
      game.sounds.select()
      this.counter = 0;
      this.sprite.visible = true;
      return this.index--;
    }
  }

  down =(tick)=> {
    if (tick > 0) { return }
    if (this.index !== (this.menu_items.length-1)) {
      game.sounds.select()
      this.counter = 0;
      this.sprite.visible = true;
      return this.index++;
    }
  }

  confirm =(tick)=> {
    if (tick > 0) { return }
    game.sounds.confirm()
    console.log(this.menu_items,this.index)
    return this.menu_items[this.index]()
  }

  cancel =(tick)=> {
    if (tick > 0) { return }
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
}
