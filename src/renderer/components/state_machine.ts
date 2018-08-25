import ComponentPanel from 'components/panel'
import {
	STATIC,
  HANG,
	FALL,
	LAND,
	CLEAR,
	MOVE,
	GARBAGE
} from 'common/data';
import State from "states/panel/state"
import StateStatic from "states/panel/static"
import StateHang from "states/panel/hang"
import StateFall from "states/panel/fall"
import StateLand from "states/panel/land"
import StateClear from "states/panel/clear"
import StateMove from "states/panel/move"

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
			[MOVE, new StateMove(parent)]
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
		
		this.states.get(this.state).execute()

		if (this.parent.counter <= 0)
			this.states.get(this.state).counter_end()
	}	
}
