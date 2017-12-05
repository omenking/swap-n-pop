import game    from 'core/game'
import filters from 'core/filters'
import ComponentPlayfield from 'components/playfield'
import { WALL_ROLLUP } from 'core/data';

const {px} = filters

export default class ComponentPlayfieldWall {
  private playfield : ComponentPlayfield
  private x         : number
  private y         : number
  private sprite    : Phaser.Sprite
  private counter   : number

  create(playfield,x,y) {
    this.playfield = playfield
    this.sprite    = game.add.sprite(x, y, `playfield_wall${this.playfield.pi}`)
    this.counter   = 0
  }

  update() {
    if (this.counter < WALL_ROLLUP.length-1) {
      this.counter++
    }
  }

  render() {
    //frame animation offset from from the bottom of the wall
    this.sprite.y = px(this.playfield.y + 168 - WALL_ROLLUP[this.counter])
  }
}
