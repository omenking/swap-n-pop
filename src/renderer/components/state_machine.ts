import ComponentPanel from 'components/panel'
import {
	STATIC,
  HANG,
	FALL,
	LAND,
	CLEAR,
	SWAP_L,
	SWAP_R,
	SWAPPING_L,
	SWAPPING_R,
} from 'common/data';
import State from "panel_states/state"
import Static from "panel_states/static"
import Hang from "panel_states/hang"
import Fall from "panel_states/fall"
import Land from "panel_states/land"
import Clear from "panel_states/clear"
import Swap_L from "panel_states/swap_l"
import Swap_R from "panel_states/swap_r"
import Swapping_L from "panel_states/swapping_l"
import Swapping_R from "panel_states/swapping_r"

export default class StateMachine {
	// reference
	public parent : ComponentPanel

	// inner variables
	public state : ""
	public states : Map<String, State>

	constructor(parent, first_state) {
		this.parent = parent
		this.state = first_state
	
		this.states = new Map([
			[STATIC, new Static(parent)],
			[HANG, new Hang(parent)],
			[FALL, new Fall(parent)],
			[LAND, new Land(parent)],
			[CLEAR, new Clear(parent)],
			[SWAP_L, new Swap_L(parent)],
			[SWAP_R, new Swap_R(parent)],
			[SWAPPING_L, new Swapping_L(parent)],
			[SWAPPING_R, new Swapping_R(parent)]
		])
	}

	change_state(new_state) {
		if (this.state == new_state)
			return

		this.states[this.state].exit()

		this.state = new_state
		this.states[this.state].enter()
	}

	update() {
		if (this.parent.counter > 0)
			this.parent.counter -= 1

		this.states[this.state].execute()

		//if (this.parent.counter <= 0)
			//this.states[this.state].counter_end()
	}	
}
