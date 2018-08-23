import State from "panel_states/state"
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
import blank from 'components/panel_blank'

export default class Land extends State {
	enter()	{ 
    this.p.counter = assets.spritesheets.panels.animations.land.length
    
    // If chain is 0, it means the panel did not fall as a result of a clear and should not chain
    if (this.p.chain > 0) { this.p.chain = this.p.playfield.chain }
	}
	
	execute() { 
		if (this.p.counter <= 0) { 
      if (this.p.under === blank ? false : this.p.under.state === HANG) {
        this.p.fsm.change_state(HANG)
        this.p.counter = this.p.under.counter
      }
      else {
        this.p.fsm.change_state(STATIC) 
      }
    }
    else if (this.p.counter < assets.spritesheets.panels.animations.land.length - 1) { 
      // Don't reset chain value if a panel in column below is swapping, hanging, falling, or empty

      let under = this.p.under
      let ground = true
      while (under !== blank && under.state !== GARBAGE) {
          if (under.kind === null || under.state === SWAP_L || under.state === SWAPPING_L || under.state === SWAP_R || under.state === SWAPPING_R) {
              ground = false
              break
          }
          under = under.under
      }
      if (ground) { this.p.chain = 0 }
    } 
	} 
}