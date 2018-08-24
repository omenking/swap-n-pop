import State from "states/panel/state"
import {
  SWAPPING_R
} from 'common/data';

export default class StateSwapRright extends State {
	execute() { 
    if (this.p.counter <= 0) 
      this.p.fsm.change_state(SWAPPING_R)
	} 
}

