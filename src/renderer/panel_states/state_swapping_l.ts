import State from "panel_states/state"
import {
  STATIC,
  HANG,
  TIME_SWAP
} from 'common/data';

export default class StateSwappingL extends State {
  enter() {
    // Swap kind
    const i1 = this.p.kind
    this.p.kind = this.p.right.kind
    this.p.right.kind = i1

    // Swap chain value
    const chain = this.p.chain
    this.p.chain = this.p.right.chain
    this.p.right.chain = chain

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

