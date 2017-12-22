import game    from 'core/game'
import ComponentPlayfield from 'components/playfield'
import { px } from 'core/filters';

import {
  MOVING,
  COUNT3,
  COUNT2,
  COUNT1,
  DONE
} from 'core/data';

export default class ComponentPlayfieldCountdown {
  public  state      : Symbol
  private counter    : number
  private sprite     : Phaser.Sprite
  private playfield  : ComponentPlayfield

  private states = []

  load(snapshot) {
    this.state   = snapshot[0]
    this.counter = snapshot[1]
  }

  get snap() {
    return [this.state, this.counter]
  }

  get data(){
    return this.playfield.stage.countdown
  }

  create(playfield) {
    this.playfield = playfield
    this.sprite = game.add.sprite(0, 0, 'playfield_countdown', 0)
    this.sprite.visible = false
  }

  get done(){
    return this.state === DONE
  }

  get offset_x(){
    return this.playfield.x + px(16)
  }

  render() {
    if      (this.data.state === MOVING) {this.sprite.frame = 0}
    else if (this.data.state === COUNT3) {this.sprite.frame = 1}
    else if (this.data.state === COUNT2) {this.sprite.frame = 2}
    else if (this.data.state === COUNT1) {this.sprite.frame = 3}
    this.sprite.visible = this.data.state !== DONE
    this.sprite.x       = this.offset_x - this.data.x
    this.sprite.y       = this.data.y
  }
}
