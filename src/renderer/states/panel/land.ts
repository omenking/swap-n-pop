import State from "states/panel/state"
import {
  STATIC,
  HANG,
  SWAPPING_L,
  SWAPPING_R,
  SWAP_L,
  SWAP_R,
  GARBAGE
} from 'common/data';
import assets from 'core/assets'

export default class StateLand extends State {
	enter()	{ 
    this.p.counter = assets.spritesheets.panels.animations.land.length
    
    // If chain is 0, it means the panel did not fall as a result of a clear and should not chain
    if (this.p.chain > 0) { this.p.chain = this.p.playfield.chain }
	}
	
	execute() { 
    if (this.p.counter <= 0) { 
      let under = this.p.neighbors["down"]

      if (under !== undefined && under.fsm.state === HANG) {
        this.p.fsm.change_state(HANG)
        this.p.counter = under.counter
      }
      else {
        this.p.fsm.change_state(STATIC) 
      }
    }
    else if (this.p.counter < assets.spritesheets.panels.animations.land.length - 1) { 
      // Don't reset chain value if a panel in column below is swapping, hanging, falling, or empty

      let under = this.p.neighbors["down"]
      let ground = true
      while (under !== undefined && under.fsm.state !== GARBAGE) {
          if (under.kind === null || under.fsm.state === SWAP_L || under.fsm.state === SWAPPING_L || under.fsm.state === SWAP_R || under.fsm.state === SWAPPING_R) {
              ground = false
              break
          }
          under = under.neighbors["down"]
      }
      if (ground) { this.p.chain = 0 }
    } 
	} 
}