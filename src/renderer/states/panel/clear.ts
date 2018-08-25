import State from "states/panel/state"
import {
  STATIC,
  TIME_FLASH,
} from 'common/data';

let flash_anim = [5, 5, 0, 0]
let internal_counter = 0 // stop after data.FACE_TIME[level] has been reached

// for safety reset the anim_counter
export default class StateClear extends State {
  enter() {
    this.p.anim_counter = 0
  }

  // when counter is at 0 it will return to IDLE
  // meanwhile a cleartime is counted down to turn blocks invisible
  // one by one, this happens before the actual "counter" is at 0
  execute() {
    // clear at the end
    if (this.p.clear_time - this.p.clear_counter <= 0 && !this.p.clearing) {
      //this.p.set_particles_clear()
      //this.p.particles.spawn = true
      this.p.clearing = true
      //Input.start_joy_vibration(0, 1, 0, 0.05)
    }
    else {
      this.p.clear_counter += 1
      internal_counter += 1
      
      // split animations in 2 sections
      if (internal_counter < TIME_FLASH[this.p.playfield.level]) {
        // flashy anim
        if (this.p.anim_counter == 0)
          this.p.anim_counter = 4
        else
          this.p.anim_offset = flash_anim[this.p.anim_counter]
      }
      else {
        // just the face part
        this.p.anim_offset = 6
      }
    }
  }
    
  counter_end() {
    this.p.fsm.change_state(STATIC)
  }

  // turns all blocks above from this column to be chainable
  // and turns this block empty
  exit() {
    // set all above to this chain and hang
    for (let i = 0; i < this.p.y; i++) {
      let above = this.p.playfield.stack_xy(this.p.x, i)
  
      if (above !== undefined && above.kind !== null && above.fsm.state == STATIC)
        above.chainable = true
    }

    this.p.kind = null
    this.p.counter = 0
    this.p.anim_offset = 0

    // clear variable resets
    this.p.clearing = false
    this.p.clear_counter = 0

    // internal state variables
    internal_counter = 0
  }
}