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
	GARBAGE
} from 'common/data';
import State from "states/panel/state"
import StateStatic from "states/panel/static"
import StateHang from "states/panel/hang"
import StateFall from "states/panel/fall"
import StateLand from "states/panel/land"
import StateClear from "states/panel/clear"
import StateSwapLeft from "states/panel/swap_left"
import StateSwapRight from "states/panel/swap_right"
import StateSwappingLeft from "states/panel/swapping_left"
import StateSwappingRight from "states/panel/swapping_right"

export default class StateMachine {
	// reference
	public parent : ComponentPanel

	// inner variables
	public state : String
	public states : Map<String, State>
	public timer : number

	constructor(parent, first_state) {
		this.parent = parent
		this.state = first_state
	
		this.states = new Map([
			[STATIC, new StateStatic(parent)],
			[HANG, new StateHang(parent)],
			[FALL, new StateFall(parent)],
			[LAND, new StateLand(parent)],
			[CLEAR, new StateClear(parent)],
			[SWAP_L, new StateSwapLeft(parent)],
			[SWAP_R, new StateSwapRight(parent)],
			[SWAPPING_L, new StateSwappingLeft(parent)],
			[SWAPPING_R, new StateSwappingRight(parent)]
		])
	}

	change_state(new_state) {
		if (new_state === GARBAGE)
			return

		if (this.state == new_state)
			return

		this.states.get(this.state).exit()

		this.state = new_state
		this.states.get(this.state).enter()
	}

	update() {
		if (this.state === GARBAGE)
			return
		
		if (this.parent.counter > 0)
			this.parent.counter -= 1

		this.states.get(this.state).execute()

		if (this.parent.counter <= 0)
			this.states.get(this.state).counter_end()
	}	
}
