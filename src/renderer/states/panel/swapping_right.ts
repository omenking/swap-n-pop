import State from "states/panel/state"
import {
  STATIC,
  HANG,
  TIME_SWAP
} from 'common/data';

export default class StateSwappingRight extends State {
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

