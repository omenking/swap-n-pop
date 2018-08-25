import State from "states/panel/state"
import {
  STATIC,
  HANG,
  GARBAGE,
  MOVE
} from 'common/data';
import assets from 'core/assets'

var land_anim = [4, 4, 4, 2, 2, 2, 3, 3, 3, 0]

export default class StateLand extends State {
	enter()	{ 
    this.p.counter = assets.spritesheets.panels.animations.land.length
    this.p.anim_counter = assets.spritesheets.panels.animations.land.length
	}
  
  // set animation
	execute() { 
    // anim from left to right, 0 to 10
    this.p.anim_offset = land_anim[assets.spritesheets.panels.animations.land.length - this.p.anim_counter - 1]
  }

  counter_end() {
    let above = this.p.neighbors["up"]

    if (above !== undefined && above.fsm.state === HANG) {
      this.p.fsm.change_state(HANG)
      this.p.counter = above.counter
    }
    else
      this.p.fsm.change_state(STATIC)
  } 
  
  exit() {
    this.p.anim_offset = 0
    this.p.chainable = false
  }
}