import State from "states/panel/state"
import {
  STATIC,
  LAND,
  HANG,
} from 'common/data';

export default class StateFall extends State {
	execute() { 
    let under = this.p.neighbors["down"]
    
    if (under !== undefined) {
      if (under.empty) {
        this.p.swap_properties("down")
      } 
      else if (under.fsm.state === HANG) {
        this.p.fsm.state = HANG;
        this.p.counter = under.counter;
      }
      else {
        this.p.fsm.change_state(LAND);
      }
    }
    else 
      this.p.fsm.state = STATIC
	} 
}