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
import StateStatic from "panel_states/state_static"
import StateHang from "panel_states/state_hang"
import StateFall from "panel_states/state_fall"
import StateLand from "panel_states/state_land"
import StateClear from "panel_states/state_clear"
import StateSwapL from "panel_states/state_swap_l"
import StateSwapR from "panel_states/state_swap_r"
import StateSwappingL from "panel_states/state_swapping_l"
import StateSwappingR from "panel_states/state_swapping_r"

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
			[STATIC, new StateStatic(parent)],
			[HANG, new StateHang(parent)],
			[FALL, new StateFall(parent)],
			[LAND, new StateLand(parent)],
			[CLEAR, new StateClear(parent)],
			[SWAP_L, new StateSwapL(parent)],
			[SWAP_R, new StateSwapR(parent)],
			[SWAPPING_L, new StateSwappingL(parent)],
			[SWAPPING_R, new StateSwappingR(parent)]
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
