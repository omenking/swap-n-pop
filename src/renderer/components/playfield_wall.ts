import game    from 'core/game'
import ComponentPlayfield from 'components/playfield'
import {
  WALL_ROLLUP,
  TIME_WALL_WAIT,
  ROLLUP,
  ROLLDOWN,
  WAIT,
  DONE
} from 'common/data'
import { px } from 'core/filters'

export default class ComponentPlayfieldWall {
  private playfield : ComponentPlayfield
  private x         : number
  private y         : number
  private sprite    : Phaser.Sprite

  create(playfield,x,y) {
    console.log('playfield wall',playfield)
    this.playfield = playfield
    this.sprite    = game.add.sprite(x, y, `playfield_wall${this.playfield.pi}`)
  }

  get state(){
    return this.playfield.stage.wall.state
  }

  get state_timer(){
    return this.playfield.stage.wall.state_timer
  }

  render() {
    const y_offset = 168
    const len      = WALL_ROLLUP.length-1
    switch (this.state){
      case ROLLUP:
        this.sprite.y = px(
          this.playfield.y +
          (y_offset - WALL_ROLLUP[this.state_timer])
        )
        break;
      case WAIT:
        this.sprite.y = px(
          this.playfield.y +
          (y_offset - WALL_ROLLUP[len])
        )
        break;
      case ROLLDOWN:
        this.sprite.y = px(
          this.playfield.y +
          (y_offset - WALL_ROLLUP[len-this.state_timer])
        )
        break;
      case DONE:
        this.sprite.y = px(
          this.playfield.y +
          (y_offset - WALL_ROLLUP[0])
        )
        break;
    }
  }
}
