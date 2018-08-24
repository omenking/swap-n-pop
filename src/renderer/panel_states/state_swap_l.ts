import State from "panel_states/state"
import {
  SWAPPING_L
} from 'common/data';

export default class StateSwapL extends State {
	execute() { 
    if (this.p.counter <= 0) 
      this.p.fsm.change_state(SWAPPING_L)
	} 
}

