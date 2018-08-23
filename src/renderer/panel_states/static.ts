import State from "panel_states/state"
import {
  HANG,
} from 'common/data';
import assets from 'core/assets'

export default class Static extends State {
	execute() {
		if (!this.p.empty && (this.p.under.empty || this.p.under.state === HANG)) {
				this.p.fsm.change_stateHANG)
		  } else if (this.p.danger && this.p.counter === 0) {
				// we add 1 otherwise we will miss out on one frame
				// since counter can never really hit zero and render
				this.p.chain = 0
				this.p.counter = assets.spritesheets.panels.animations.danger.length+1
		  } else {
				this.p.chain = 0
		  }
	}
}