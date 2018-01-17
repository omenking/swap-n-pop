import game from 'core/game'
import controls from 'core/controls'
import ComponentMenuItem   from 'components/menu_item'
import { MENUCURSORBLINK, UNIT } from 'common/data';

export default class ComponentMenuCursor {
  private menu       : any
  private menu_items : Array<ComponentMenuItem>
  private counter    : number
  private index      : number
  private sprite     : Phaser.Sprite

  constructor() {
  }

  create(menu,menu_items) {
    this.menu       = menu
    this.menu_items = menu_items

    this.counter = 0
    this.index   = 0
    this.sprite  = game.add.sprite(this.menu.x + 20, this.y, 'menu_cursor')
    this.map_controls(0)
    this.map_controls(1)
  }

  get y(){
    return this.menu_items[this.index].y + 3
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
    if (tick === 0 || tick % 7 === 0 ) { 
      game.sounds.select()
      this.counter = 0;
      this.sprite.visible = true;
      this.menu_items[this.index].deselect()
      if (this.index !== 0) {
        this.index--;
      } else {
        this.index = this.menu_items.length-1
      }
      this.menu_items[this.index].select()
    }
  }

  down(tick) {
    if (tick === 0 || tick % 7 === 0 ) {
      game.sounds.select()
      this.counter = 0;
      this.sprite.visible = true;
      this.menu_items[this.index].deselect()
      if (this.index !== (this.menu_items.length-1)) {
        this.index++;
      } else {
        this.index = 0
      }
      this.menu_items[this.index].select()
    }
  }

  confirm(tick) {
    if (tick > 0) { return }
    game.sounds.confirm()
    this.menu_items[this.index].action()
  }

  cancel(tick) {
    if (tick > 0) { return }
  }

  update() {
    this.sprite.y = this.y
    this.counter++;
    if (this.counter > MENUCURSORBLINK) {
      this.counter = 0;
      this.sprite.visible = !this.sprite.visible;
    }
  }
}
