import State from "states/panel/state"
import {
  SWAPPING_L
} from 'common/data';

export default class StateSwapLeft extends State {
	execute() { 
    if (this.p.counter <= 0) 
      this.p.fsm.change_state(SWAPPING_L)
	} 
}

