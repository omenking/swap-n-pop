import State from "states/panel/state"
import {FALL, TIME_HOVER} from "common/data"

export default class StateHang extends State {
	enter()	{ 
		this.p.counter = TIME_HOVER[this.p.playfield.level] 
	}
	
	counter_end() { 
		this.p.fsm.change_state(FALL) 
	} 
}