import State from "panel_states/state"
import {
  STATIC,
  LAND,
  HANG,
} from 'common/data';

export default class StateFall extends State {
	execute() { 
    if (this.p.counter > 0) 
      return

    if (this.p.under.empty) {
      this.p.under.kind    = this.p.kind
      this.p.under.state   = this.p.state
      this.p.under.counter = this.p.counter
      this.p.under.chain   = this.p.chain

      this.p.kind    = null
      this.p.state   = STATIC
      this.p.counter = 0
      this.p.chain   = 0
    } 
    else if (this.p.under.state === HANG) {
      this.p.state = HANG;
      this.p.counter = this.p.under.counter;
    }
    else {
      this.p.fsm.change_state(LAND);
    }
	} 
}