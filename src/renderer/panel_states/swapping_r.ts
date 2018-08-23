import State from "panel_states/state"
import {
  STATIC,
  HANG,
  TIME_SWAP
} from 'common/data';

export default class Swapping_R extends State {
  enter() {
    this.p.counter = TIME_SWAP
  }
  
  execute() { 
    if (this.p.counter <= 0)  
      if (this.p.should_hang) 
        this.p.fsm.change_state(HANG)
      else 
        this.p.fsm.change_state(STATIC)
	} 
}

