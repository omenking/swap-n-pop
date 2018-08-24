import State from "states/panel/state"
import {
  STATIC,
  LAND,
  HANG,
} from 'common/data';

export default class StateFall extends State {
	execute() { 
    if (this.p.counter > 0) 
      return

    let under = this.p.neighbors["down"]
    
    if (under !== undefined) {
      if (under.empty) {
        under.kind    = this.p.kind
        under.fsm.state   = this.p.fsm.state
        under.counter = this.p.counter
        under.chain   = this.p.chain
  
        this.p.kind = null
        this.p.fsm.state = STATIC
        this.p.counter = 0
        this.p.chain   = 0
      } 
      else if (under.fsm.state === HANG) {
        this.p.fsm.state = HANG;
        this.p.counter = under.counter;
      }
      else {
        this.p.fsm.change_state(LAND);
      }
    } 
	} 
}