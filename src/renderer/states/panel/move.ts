import State from "states/panel/state"
import {
  HANG,
  UNIT,
  TIME_SWAP,
  STATIC
} from 'common/data';

export default class StateMove extends State {
  // t = elapsed time, b = start, c = goal, d = duration
  ease_out_quad(t, b, c, d) {
    t = t / d
	  return -c * t * (t - 2) + b
  }

  // animates the offset position so this doesnt need to be done in panel itself
	execute() {
    this.p.offset.x = this.p.move_dir * UNIT + -this.p.move_dir * this.ease_out_quad(
      TIME_SWAP - this.p.counter,
      0, UNIT,
      TIME_SWAP
    ) 
  }

  // change to static or hang instantly
  counter_end() {
    // needs to check for hang so no accidental state changes result or 1 frame issues
    if (this.p.check_for_hang)
      this.p.fsm.change_state(HANG)
    else {
      this.p.fsm.state = STATIC
      this.p.offset.x = 0
    }
  }
}