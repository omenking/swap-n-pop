import State from "states/panel/state"
import {
  HANG,
} from 'common/data';
import assets from 'core/assets'

export default class StateStatic extends State {
	execute() {
		if (this.p.check_for_hang)
				this.p.fsm.change_state(HANG)
		else
			this.p.chainable = false
	}
}