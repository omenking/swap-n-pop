import State from "states/panel/state"
import {FALL} from "common/data"

export default class StateHang extends State {
	enter()	{ 
		this.p.counter = 10 
	}
	
	execute() { 
		if (this.p.counter <= 0)  
			this.p.fsm.change_state(FALL) 
	} 
}